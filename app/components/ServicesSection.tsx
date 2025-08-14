import Image from 'next/image';

const ServicesSection = () => {
  const services = [
    {
      icon: '/ui/service/Services free.svg',
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140'
    },
    {
      icon: '/ui/service/customer.svg',
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support'
    },
    {
      icon: '/ui/service/money.svg',
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days'
    }
  ];

  return (
    <section className="py-16 mb-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
              </div>
              <h3 className="text-lg font-bold text-black mb-2 uppercase">
                {service.title}
              </h3>
              <p className="text-sm text-black">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;