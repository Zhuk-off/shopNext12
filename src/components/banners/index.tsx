import Image from 'next/image';
import Link from 'next/link';
import Container from '../container';

const banners = [
  {
    icon: '/logo.svg',
    uri: 'search/?q=Wortex',
    title: 'Wortex',
    description: 'Найди свой инструмент!',
  },
  {
    icon: '/logo.svg',
    uri: 'search/?q=Bosch',
    title: 'Bosch',
    description: 'Найди свой инструмент!',
  },
  {
    icon: '/logo.svg',
    uri: 'search/?q=Bull',
    title: 'Bull',
    description: 'Найди свой инструмент!',
  },
  {
    icon: '/logo.svg',
    uri: 'search/?q=Makita',
    title: 'Makita',
    description: 'Найди свой инструмент!',
  },
  {
    icon: '/logo.svg',
    uri: 'search/?q=Волат',
    title: 'Волат',
    description: 'Найди свой инструмент!',
  },
  {
    icon: '/logo.svg',
    uri: 'search/?q=Fermer',
    title: 'Fermer',
    description: 'Найди свой инструмент!',
  },
];

export const Banners = () => {
  return (
    <section className="hidden pb-20 pt-5 sm:block">
      <Container>
        <div className="grid grid-cols-6 justify-center gap-3">
          {banners?.map((item, index) => (
            <Link key={index} href={`/${item.uri}`}>
              <div className="h-[200px]  overflow-hidden whitespace-nowrap rounded-xl bg-gray-100 px-3 py-5 text-center transition-all hover:bg-red-50 hover:text-red-600">
                <div>
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="h-[100px] w-[200px] object-contain"
                  />
                </div>
                <div className="overflow-hidden text-clip text-center font-semibold">
                  {item.title}
                </div>
                <div className="hidden whitespace-normal text-center text-sm md:block">
                  {item.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
