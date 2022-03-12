import Helmet from "../components/Helmet";
import HeroSlider from "../components/HeroSlider";
import heroSliderData from "../assets/fake-data/hero-slider";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import Grid from "../components/Grid";
import policy from "../assets/fake-data/policy";
import PolicyCard from "../components/PolicyCard";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import productData from "../assets/fake-data/products";
import banner from "../assets/images/banner.png";
import { useEffect } from "react";
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Helmet title="Trang Chủ">
      <HeroSlider
        data={heroSliderData}
        control={false}
        auto={true}
        timeOut={3000}
      />

      <Section>
        <SectionTitle>Mẫu giày đang hot</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData.getProducts(4).map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image01}
                img02={item.image02}
                name={item.title}
                price={Number(item.price)}
                slug={item.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>

      <Section>
        <SectionTitle>Mẫu giày mới</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData.getProducts(8).map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image01}
                img02={item.image02}
                name={item.title}
                price={Number(item.price)}
                slug={item.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>

      <Section>
        <SectionBody>
          <Link to="/catalog">
            <img className="banner" src={banner} alt="" />
          </Link>
        </SectionBody>
      </Section>
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => (
              <Link key={index} to="/contact">
                <PolicyCard
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>

      <Section>
        <SectionTitle>Phổ biến với mọi người</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData.getProducts(12).map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image01}
                img02={item.image02}
                name={item.title}
                price={Number(item.price)}
                slug={item.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Home;
