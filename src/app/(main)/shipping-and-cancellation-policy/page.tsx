import Link from "next/link";
import React from "react";

const ShippingPolicyPage = () => {
  return (
    <div className="~pt-[1rem]/[1.5rem] ~px-[0.75rem]/[1.5rem]  2xl:~px-[-10.75rem]/[15rem]">
      <div className=" w-full  overflow-hidden rounded-[1rem] justify-center flex items-center bg-[#F8F5EE] ~h-[22.9375rem]/[25.0625rem] relative">
        <div className=" ~px-[0.84375rem]/[4rem] justify-center flex relative  flex-col items-center  z-50">
          <div className="~pt-[1.75rem]/[1rem]">
            <h1 className=" font-medium leading-[110%] text-center tracking-[-0.05em] bg-gradient-to-b bg-clip-text text-transparent  from-[#000000] to-[#66666697]  ~text-[1.5rem]/[4rem]">
              Shipping & Cancellation Policy
            </h1>

            <p className="~text-[0.875rem]/[1.125rem] ~pt-[0.5rem]/[2.3125rem] text-center md:font-medium tracking-[-0.05em] text-[#1A1A1ABF] leading-[110%]">
              Last Updated: March 2026
            </p>
          </div>
        </div>
      </div>
      <div className="~py-[1.875rem]/[5rem] ~space-y-[1.5rem]/[2rem]">
        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            1. Scope
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%]">
            <span className="font-medium">1.1</span> This Shipping &
            Cancellation Policy ("Shipping Policy") governs dispatch, shipment,
            delivery and cancellation of orders placed on the Website operated
            by the Company. This Shipping Policy forms part of and must be read
            with the Terms & Conditions.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            2. Shipping Coverage and Dispatch
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">2.1</span> The Company offers delivery
            across India through third-party courier/logistics partners.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%]">
            <span className="font-medium">2.2</span> Orders are typically
            dispatched within three (3) to seven (7) business days from
            successful payment confirmation. Dispatch timelines are estimates
            and may vary due to inventory availability, operational constraints,
            address verification, and other reasonable factors.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            3. Delivery Timelines and Delays
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">3.1</span> Delivery timelines are
            dependent on the Customer's location, courier partner
            serviceability, governmental restrictions, weather conditions, and
            other external factors.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">3.2</span> The Company will make
            reasonable efforts to facilitate timely delivery; however, the
            Company does not guarantee delivery by a specific date or time
            unless expressly confirmed in writing by the Company.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%]">
            <span className="font-medium">3.3</span> The Company shall not be
            liable for delivery delays attributable to events beyond the
            Company's reasonable control, including courier delays, strikes,
            transport disruptions, regulatory restrictions, natural calamities,
            or force majeure events.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            4. Shipping Charges
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">4.1</span> Shipping charges, if
            applicable, are calculated and displayed at checkout based on
            factors including delivery location and shipment weight/volumetric
            weight, and the Customer agrees to pay the charges displayed at the
            time of placing the order.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%]">
            <span className="font-medium">4.2</span> Any shipping charges
            applicable at the time of checkout shall apply to that order even if
            shipping rate cards change thereafter.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            5. Delivery Address and Customer Responsibility
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">5.1</span> The Customer is responsible
            for providing complete, accurate delivery address details including
            PIN code, landmark where relevant, and reachable contact number.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">5.2</span> The Company shall not be
            responsible for delivery failure or delay caused by incorrect or
            incomplete address details, unreachable phone numbers, or
            refusal/unavailability of the recipient at the delivery address.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%]">
            <span className="font-medium">5.3</span> In case the shipment is
            returned to origin due to reasons attributable to the Customer
            (including wrong address, refusal, repeated failed delivery
            attempts, or unavailability), the Company may, subject to applicable
            law, deduct actual shipping/return logistics charges from any refund
            that may otherwise be payable, or may request the Customer to bear
            re-shipping charges for re-dispatch.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            6. Transfer of Risk
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">6.1</span> Risk in the Products passes
            to the Customer upon successful delivery at the delivery address
            provided at checkout. Successful delivery includes delivery
            confirmation captured by the courier partner's tracking system.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%]">
            <span className="font-medium">6.2</span> Any concern regarding
            tampering or visible package damage must be documented at the time
            of delivery to the extent possible and reported to the Company
            within the timeframe stated in the Returns, Refunds & Replacement
            Policy.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            7. Cancellation Policy
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">7.1</span> The Website operates in
            prepaid mode only and does not offer Cash on Delivery (COD).
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">7.2</span> A Customer may request
            cancellation only prior to dispatch of the order. Once the order has
            been dispatched, cancellation is not permitted and any resolution
            shall be governed by the Returns, Refunds & Replacement Policy,
            subject to applicable law.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%]">
            <span className="font-medium">7.3</span> If an order is cancelled
            prior to dispatch, the Company will initiate a refund to the
            original payment method within seven (7) business days, and the time
            for credit may vary based on payment provider/bank.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            8. Contact
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%]">
            <span className="font-medium">8.1</span> Shipping and cancellation
            requests may be addressed to{" "}
            <Link
              target="_blank"
              href="mailto:shreekakajimasale@gmail.com"
              className="text-main font-medium hover:underline"
            >
              shreekakajimasale@gmail.com
            </Link>{" "}
            (and the Customer Support number displayed on the Website).
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
