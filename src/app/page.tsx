import ScrollTop from "@/components/scrollToTop";
import CTASection from "@/pages/Home/CTASection";
import CustomerReviews from "@/pages/Home/CustomerReviews";
import FoodHubHero from "@/pages/Home/FoodHubHero";
import HomeFooter from "@/pages/Home/HomeFooter";
import HowItWorks from "@/pages/Home/HowItWorks";
import PopularCategories from "@/pages/Home/popularCategories";
import PopularMeals from "@/pages/Home/PopularMeals";
import WhyChooseUs from "@/pages/Home/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <FoodHubHero />

      <PopularCategories />

      <PopularMeals />

      <WhyChooseUs />

      <HowItWorks />

      <CustomerReviews />

      <CTASection />

      <HomeFooter />

      <ScrollTop />
    </div>
  );
}
