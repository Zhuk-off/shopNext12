import Image from 'next/image';
import Link from 'next/link';

const banners = [
  { icon: '/logo.png', uri: '#', title: 'Wortex', description: 'description' },
  { icon: '/logo.png', uri: '#', title: 'Bosch', description: 'description' },
  { icon: '/logo.png', uri: '#', title: 'Bull', description: 'description' },
  {
    icon: '/logo.png',
    uri: '#',
    title: 'Makita',
    description: 'description',
  },
  { icon: '/logo.png', uri: '#', title: 'Matrix', description: 'description' },
  { icon: '/logo.png', uri: '#', title: 'Fermer', description: 'description' },
];

export const Banners = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-6 justify-center gap-3">
        {banners.map((item, index) => (
          <Link key={index} href={item.uri}>
            <div className="h-[200px] overflow-hidden whitespace-nowrap rounded-xl bg-gray-100 px-3 py-5 text-center transition-all hover:bg-red-50 hover:text-red-600">
              <div className="">
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
              <div className="overflow-hidden text-clip text-center">
                {item.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
