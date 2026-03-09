import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="~pt-[1rem]/[1.5rem] ~px-[0.75rem]/[1.5rem]  2xl:~px-[-10.75rem]/[15rem]">
      <div className=" w-full  overflow-hidden rounded-[1rem] justify-center flex items-center bg-[#F8F5EE] ~h-[22.9375rem]/[25.0625rem] relative">
        <div className=" ~px-[0.84375rem]/[4rem] justify-center flex relative  flex-col items-center  z-50">
          <div className="~pt-[1.75rem]/[1rem]">
            <h1 className=" font-medium leading-[110%] text-center tracking-[-0.05em] bg-gradient-to-b bg-clip-text text-transparent  from-[#000000] to-[#66666697]  ~text-[1.5rem]/[4rem]">
              Terms & Conditions
            </h1>

            <p className="~text-[0.875rem]/[1.125rem] ~pt-[0.5rem]/[2.3125rem] text-center md:font-medium tracking-[-0.05em] text-[#1A1A1ABF] leading-[110%]">
              (Website Use & Sale of Products)
              <br />
              Last Updated: March 2026
            </p>
          </div>
        </div>
      </div>
      <div className="~py-[1.875rem]/[5rem] ~space-y-[1.5rem]/[2rem]">
        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            1. Legal Entity Disclosure
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-4">
            This Website, www.shreekakajimasale.com ("Website"), is owned and
            operated by:
          </p>
          <div className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-4 bg-[#F9FAFB] p-4 rounded-lg">
            <p className="font-medium text-black">Rushab Babariya,</p>
            <p>Sole Proprietor trading as Shree Kakaji Masale</p>
            <p>
              Business Address: Om Plaza, Shop No 2, Trimurti Chowk,
              Trimurti-Kamatwade Rd, Nashik, Maharashtra 422008
            </p>
            <p>GSTIN: 27AVFPB7806F1ZS</p>
            <p>FSSAI License No.: 11518027001668</p>
            <p>
              Customer Care:{" "}
              <span className="">
                {" "}
                <Link
                  href={"tel:+917277331111"}
                  target="_blank"
                  className="text-main font-medium hover:underline"
                >
                  +91 7277331111
                </Link>
              </span>
            </p>
            <p>
              Email:
              <span className="">
                {" "}
                <Link
                  href={"mailto:shreekakajimasale@gmail.com"}
                  target="_blank"
                  className="text-main font-medium hover:underline"
                >
                  shreekakajimasale@gmail.com
                </Link>
              </span>
            </p>
          </div>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            For the purposes of these Terms & Conditions:
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">1.1</span> "Company", "We", "Us", or
            "Our" shall mean: Rushab Babariya, sole proprietor trading under the
            name and style of Shree Kakaji Masale, having GSTIN 27AVFPB7806F1ZS
            and FSSAI License No. 11518027001668.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">1.2</span> "Website" means
            www.shreekakajimasale.com and all associated pages.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">1.3</span> "User", "You", or
            "Customer" means any individual accessing or purchasing through the
            Website.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">1.4</span> "Products" means food
            products including spices, masalas, pickles and related consumable
            goods offered for sale.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            2. Acceptance of Terms
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%]">
            By accessing the Website, browsing, placing an order, or using any
            services provided herein, you ("User" or "Customer") agree to be
            bound by these Terms & Conditions.
            <br />
            <br />
            If you do not agree, you must discontinue use of the Website.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            3. Eligibility
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            The Website may be used only by individuals who:
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            (a) are at least eighteen (18) years of age;
            <br />
            (b) are competent to contract under Indian law; and
            <br />
            (c) provide accurate and complete information at the time of
            purchase.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%]">
            The Company reserves the right to refuse service where eligibility
            criteria are not satisfied.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            4. Products and Regulatory Compliance
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">4.1</span> The Company sells food
            products including spices, masalas, pickles and related edible goods
            ("Products").
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">4.2</span> All Products are sold in
            compliance with the Food Safety and Standards Act, 2006 and
            applicable regulations.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">4.3</span> Product images displayed on
            the Website are illustrative in nature. Due to the natural
            characteristics of agricultural produce, variations in colour,
            aroma, texture and appearance may occur and shall not constitute
            defect.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">4.4</span> Customers are responsible
            for reviewing ingredient information for allergen concerns before
            consumption.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            5. Pricing and Taxation
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">5.1</span> All prices are displayed in
            Indian Rupees (INR).
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">5.2</span> Prices are inclusive of
            applicable GST unless otherwise specified.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">5.3</span> The Company reserves the
            right to revise prices, correct typographical errors, and cancel
            orders placed at incorrect prices.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">5.4</span> In case of cancellation due
            to pricing or stock error, a full refund shall be issued.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            6. Payment Terms
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">6.1</span> The Website operates on
            prepaid mode only. Cash on Delivery (COD) is not available.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">6.2</span> Payments are processed
            through third-party payment gateway providers.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">6.3</span> The Company shall not be
            liable for payment gateway downtime, transaction failures, or
            banking delays beyond its control.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            7. Order Confirmation
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">7.1</span> An order is deemed accepted
            only upon successful payment confirmation.
          </p>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <span className="font-medium">7.2</span> The Company reserves the
            right to cancel orders due to:
          </p>
          <ul className="list-disc pl-5 space-y-1 ~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <li>Stock unavailability</li>
            <li>Regulatory restrictions</li>
            <li>Suspected fraudulent activity</li>
            <li>Technical errors</li>
          </ul>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            8. Shipping and Delivery
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%]">
            Shipping and cancellation terms are governed by the Shipping &
            Cancellation Policy available separately on the Website.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            9. Returns and Refunds
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%]">
            Returns and refunds are governed by the Return, Refund & Replacement
            Policy available separately on the Website.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            10. Intellectual Property
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%]">
            All trademarks, logos, packaging designs, product images, website
            content and materials are proprietary to the Company and protected
            under Indian intellectual property laws.
            <br />
            <br />
            Unauthorized reproduction or use is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            11. User Obligations
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            The User agrees not to:
          </p>
          <ul className="list-disc pl-5 space-y-1 ~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%] mb-2">
            <li>Attempt unauthorized access to Website systems</li>
            <li>Introduce malicious code</li>
            <li>Copy or scrape Website content</li>
            <li>Use the Website for unlawful purposes</li>
          </ul>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            12. Limitation of Liability
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%]">
            Nothing herein excludes liability that cannot be excluded under
            applicable law.
            <br />
            <br />
            To the maximum extent permitted by law, the Company shall not be
            liable for indirect, incidental or consequential damages arising
            from use of the Website.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            13. Force Majeure
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%]">
            The Company shall not be liable for delays or failure due to events
            beyond reasonable control including natural disasters, governmental
            actions, transport disruptions or similar events.
          </p>
        </section>

        <section>
          <h2 className="~text-[1.25rem]/[1.75rem] font-medium tracking-[-0.03em] leading-[120%] text-black mb-4">
            14. Governing Law and Jurisdiction
          </h2>
          <p className="~text-[0.875rem]/[1rem] tracking-[-0.03em] text-[#0000008F] leading-[160%]">
            These Terms shall be governed by the laws of India.
            <br />
            Courts at Nashik, Maharashtra shall have exclusive jurisdiction.
          </p>
        </section>
      </div>
    </div>
  );
};

export default page;
