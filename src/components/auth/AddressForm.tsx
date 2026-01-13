"use client";
import { useAuth } from "@/src/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface CustomerAddress {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  customer: {
    phone: string;
    phone_code: string;
  };
}

interface AddressFormProps {
  onAddressSubmitted: () => void;
  existingAddress?: CustomerAddress | null;
  isEditing?: boolean;
}

// Define address data type for API
interface AddressData {
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
}

const fetchLocationByPincode = async (pincode: string) => {
  const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);

  if (!res.ok) {
    throw new Error("Failed to fetch pincode details");
  }

  const data = await res.json();

  if (
    Array.isArray(data) &&
    data[0]?.Status === "Success" &&
    data[0]?.PostOffice?.length > 0
  ) {
    const postOffice = data[0].PostOffice[0];

    return {
      city: postOffice.District,
      state: postOffice.State,
    };
  }

  return null;
};

const schema = z.object({
  pincode: z
    .string()
    .min(6, { message: "Pincode must be 6 digits" })
    .max(6, { message: "Pincode must be 6 digits" })
    .regex(/^[0-9]+$/, { message: "Only digits allowed" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  street: z.string().min(10, { message: "Please enter complete address" }),
  name: z.string().min(2, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
});

type Schema = z.infer<typeof schema>;

const AddressForm = ({
  onAddressSubmitted,
  existingAddress,
  isEditing = false,
}: AddressFormProps) => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { submitAddress, updateCustomerAddress } = useAuth();

  const defaultValues = existingAddress
    ? {
        pincode: existingAddress.pincode || "",
        city: existingAddress.city || "",
        state: existingAddress.state || "",
        street: existingAddress.street || "",
        name: existingAddress.name || "",
        email: existingAddress.email || "",
      }
    : {
        pincode: "",
        city: "",
        state: "",
        street: "",
        name: "",
        email: "",
      };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const pincodeValue = watch("pincode");

  useEffect(() => {
    if (existingAddress) {
      reset(defaultValues);
    }
  }, [existingAddress, reset]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (pincodeValue.length === 6 && !isEditing) {
        setIsLoadingLocation(true);
        try {
          const location = await fetchLocationByPincode(pincodeValue);
          if (location) {
            setValue("city", location.city);
            setValue("state", location.state);
          } else {
            setValue("city", "");
            setValue("state", "");
            toast.error("Invalid pincode");
          }
        } catch (error) {
          toast.error("Failed to fetch location");
        } finally {
          setIsLoadingLocation(false);
        }
      }
    };

    fetchLocation();
  }, [pincodeValue, setValue, isEditing]);

  const createAddressMutation = useMutation({
    mutationFn: (data: Schema) =>
      submitAddress({
        name: data.name,
        pincode: data.pincode,
        state: data.state,
        city: data.city,
        email: data.email,
        street: data.street,
      }),
    onSuccess: (response) => {
      if (response?.success) {
        toast.success("Address saved successfully!", {
          id: "post-address",
        });
        onAddressSubmitted();
      } else {
        toast.error(response?.message || "Failed to save address", {
          id: "post-address",
        });
      }
    },
    onError: (error: any) => {
      console.error("Address submission error:", error);
      toast.error(
        error?.message || "Something went wrong while saving address"
      );
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: async (data: Schema) => {
      if (!existingAddress?.id) {
        throw new Error("Address ID is required for update");
      }

      const addressData: AddressData = {
        name: data.name,
        pincode: data.pincode,
        state: data.state,
        city: data.city,
        email: data.email,
        street: data.street,
      };

      return updateCustomerAddress(existingAddress.id.toString(), addressData);
    },
    onSuccess: (response) => {
      if (response?.success || response) {
        toast.success("Address updated successfully!", {
          id: "update-address",
        });
        onAddressSubmitted();
      } else {
        toast.error("Failed to update address", {
          id: "update-address",
        });
      }
    },
    onError: (error: any) => {
      console.error("Address update error:", error);
      toast.error(
        error?.message || "Something went wrong while updating address"
      );
    },
  });

  const handlePincodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    setValue("pincode", value.slice(0, 6));

    if (isEditing && value.length === 6) {
      setIsLoadingLocation(true);
      try {
        const location = await fetchLocationByPincode(value);
        if (location) {
          setValue("city", location.city);
          setValue("state", location.state);
          toast.success("Location updated successfully");
        } else {
          setValue("city", "");
          setValue("state", "");
          toast.error("Invalid pincode");
        }
      } catch (error) {
        toast.error("Failed to fetch location");
      } finally {
        setIsLoadingLocation(false);
      }
    }
  };

  const onSubmit = async (value: Schema) => {
    if (isEditing) {
      if (updateAddressMutation.isPending) return;
      updateAddressMutation.mutate(value);
    } else {
      if (createAddressMutation.isPending) return;
      createAddressMutation.mutate(value);
    }
  };

  const isLoading = isEditing
    ? updateAddressMutation.isPending || isSubmitting
    : createAddressMutation.isPending || isSubmitting;

  return (
    <div className="~px-[1rem]/[1.5rem] ">
      <div className="~pt-[1rem]/[2.563rem] ~pb-[1rem]/[2rem]">
        <p className="text-[0.875rem] ~pt-[0.5rem]/[1rem] text-center tracking-[-0.05em] text-[#1A1A1ABF] leading-[110%]">
          {isEditing
            ? "Update your delivery address details below"
            : "Please provide your delivery address to complete your purchase"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 h-[60svh] no-scrollbar overflow-y-auto ~pb-[2rem]/[3rem]">
          <div>
            <h5 className="~text-[0.75rem]/[0.875rem] ~pb-[0.5rem]/[0.625rem] text-start md:font-semibold font-medium leading-[120%] tracking-[-0.03em]">
              Pincode
            </h5>
            <input
              {...register("pincode")}
              onChange={handlePincodeChange}
              className="bg-[#F8F5EE] text-[#0000008F] leading-[120%] tracking-[-0.03em] ~text-[0.75rem]/[0.875rem] w-full outline-none ~rounded-[0.5rem]/[1rem] ~px-[0.5rem]/[1.25rem] ~py-[0.5rem]/[0.75rem] disabled:opacity-50"
              placeholder="Enter your pincode"
              type="text"
              maxLength={6}
              disabled={isLoading}
            />
            {errors.pincode && (
              <p className="mt-1 text-redcolor text-sm">
                *{errors.pincode.message}
              </p>
            )}
          </div>

          <div>
            <h5 className="~text-[0.75rem]/[0.875rem] ~pb-[0.5rem]/[0.625rem] text-start md:font-semibold font-medium leading-[120%] tracking-[-0.03em]">
              City
            </h5>
            <input
              {...register("city")}
              className="bg-[#F8F5EE] text-[#0000008F] leading-[120%] tracking-[-0.03em] ~text-[0.75rem]/[0.875rem] w-full outline-none ~rounded-[0.5rem]/[1rem] ~px-[0.5rem]/[1.25rem] ~py-[0.5rem]/[0.75rem] disabled:opacity-50"
              placeholder={isLoadingLocation ? "Fetching city..." : "City"}
              type="text"
              disabled={isLoading || isLoadingLocation}
            />
            {errors.city && (
              <p className="mt-1 text-redcolor text-sm">
                *{errors.city.message}
              </p>
            )}
          </div>

          <div>
            <h5 className="~text-[0.75rem]/[0.875rem] ~pb-[0.5rem]/[0.625rem] text-start md:font-semibold font-medium leading-[120%] tracking-[-0.03em]">
              State
            </h5>
            <input
              {...register("state")}
              className="bg-[#F8F5EE] text-[#0000008F] leading-[120%] tracking-[-0.03em] ~text-[0.75rem]/[0.875rem] w-full outline-none ~rounded-[0.5rem]/[1rem] ~px-[0.5rem]/[1.25rem] ~py-[0.5rem]/[0.75rem] disabled:opacity-50"
              placeholder={isLoadingLocation ? "Fetching state..." : "State"}
              type="text"
              disabled={isLoading || isLoadingLocation}
            />
            {errors.state && (
              <p className="mt-1 text-redcolor text-sm">
                *{errors.state.message}
              </p>
            )}
          </div>

          <div>
            <h5 className="~text-[0.75rem]/[0.875rem] ~pb-[0.5rem]/[0.625rem] text-start md:font-semibold font-medium leading-[120%] tracking-[-0.03em]">
              Full Address
            </h5>
            <textarea
              {...register("street")}
              className="bg-[#F8F5EE] text-[#0000008F] leading-[120%] tracking-[-0.03em] ~text-[0.75rem]/[0.875rem] w-full outline-none ~rounded-[0.5rem]/[1rem] ~px-[0.5rem]/[1.25rem] ~py-[0.5rem]/[0.75rem] min-h-[80px] resize-none disabled:opacity-50"
              placeholder="House No, Building, Street, Area"
              disabled={isLoading}
            />
            {errors.street && (
              <p className="mt-1 text-redcolor text-sm">
                *{errors.street.message}
              </p>
            )}
          </div>

          <div>
            <h5 className="~text-[0.75rem]/[0.875rem] ~pb-[0.5rem]/[0.625rem] text-start md:font-semibold font-medium leading-[120%] tracking-[-0.03em]">
              Full Name
            </h5>
            <input
              {...register("name")}
              className="bg-[#F8F5EE] text-[#0000008F] leading-[120%] tracking-[-0.03em] ~text-[0.75rem]/[0.875rem] w-full outline-none ~rounded-[0.5rem]/[1rem] ~px-[0.5rem]/[1.25rem] ~py-[0.5rem]/[0.75rem] disabled:opacity-50"
              placeholder="Enter your full name"
              type="text"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="mt-1 text-redcolor text-sm">
                *{errors.name.message}
              </p>
            )}
          </div>

          <div>
            <h5 className="~text-[0.75rem]/[0.875rem] ~pb-[0.5rem]/[0.625rem] text-start md:font-semibold font-medium leading-[120%] tracking-[-0.03em]">
              Email
            </h5>
            <input
              {...register("email")}
              className="bg-[#F8F5EE] text-[#0000008F] leading-[120%] tracking-[-0.03em] ~text-[0.75rem]/[0.875rem] w-full outline-none ~rounded-[0.5rem]/[1rem] ~px-[0.5rem]/[1.25rem] ~py-[0.5rem]/[0.75rem] disabled:opacity-50"
              placeholder="Enter your email"
              type="email"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-redcolor text-sm">
                *{errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="~pb-[5rem]/[7rem] flex justify-center">
          <button
            className="w-full rounded-full border-2 border-main leading-[120%] tracking-[-0.03em] ~px-[0.75rem]/[1.5rem] ~text-[0.75rem]/[1rem] py-[0.625rem] bg-main font-medium text-white transition-all duration-300 enabled:hover:bg-white enabled:hover:text-main disabled:opacity-50 disabled:cursor-not-allowed md:w-fit"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isEditing ? "Updating..." : "Saving..."}
              </span>
            ) : isEditing ? (
              "Update Address"
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
