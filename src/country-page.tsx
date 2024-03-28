type CountryPageProps = {
  params: {
    country: string;
  };
};

export default function CountryPage({ params }: CountryPageProps) {
  return <div>{params.country}</div>;
}
