import Image from 'next/image';
import Link from 'next/link';

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: 'Скидки до 50%',
      image: '/offers/1.jpg',
      link: '#',
    },
    {
      id: 2,
      title: 'Новые поступления',
      image: '/offers/2.jpg',
      link: '#',
    },
    {
      id: 3,
      title: 'Выгодные акции',
      image: '/offers/3.jpg',
      link: '#',
    },
    {
      id: 4,
      title: 'Уникальные скидки',
      image: '/offers/4.jpg',
      link: '#',
    },
    {
      id: 5,
      title: 'Топ распродажи',
      image: '/offers/5.jpg',
      link: '#',
    },
    {
      id: 6,
      title: 'Супер предложения',
      image: '/offers/6.jpg',
      link: '#',
    },
  ];

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="mb-6 text-3xl font-semibold">Предложения</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="overflow-hidden rounded-lg bg-white shadow-md"
            >
              <Link href={offer.link}>
                <Image
                  src={offer.image}
                  alt={offer.title}
                  className="h-48 w-full transform cursor-pointer object-cover transition duration-300 hover:scale-105"
                  width={500}
                  height={500}
                />
              </Link>
              <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold">{offer.title}</h3>
                <Link
                  href={offer.link}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Подробнее
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
