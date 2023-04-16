import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-10 text-gray-300">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3">
            <h3 className="mb-4 text-xl font-semibold">Контакты</h3>
            <ul className="list-none">
              <li className="mb-2">
                <i className="fas fa-map-marker-alt mr-2"></i>Адрес: Минск, ул.
                Козлова, 22
              </li>
              <li className="mb-2">
                <i className="fas fa-phone mr-2"></i>Телефон: +375 29 123 45 67
              </li>
              <li className="mb-2">
                <i className="fas fa-envelope mr-2"></i>Email: info@21vek.by
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="mb-4 text-xl font-semibold">О компании</h3>
            <ul className="list-none">
              <li className="mb-2">
                <Link href="/about">О нас</Link>
              </li>
              <li className="mb-2">
                <Link href="/delivery">Доставка и оплата</Link>
              </li>
              <li className="mb-2">
                <Link href="/contacts">Контакты</Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="mb-4 text-xl font-semibold">Мы в соцсетях</h3>
            <ul className="list-none">
              <li className="mb-2">
                <Link
                  href="https://www.facebook.com/21vek.by/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook mr-2"></i>Facebook
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="https://www.instagram.com/21vek.by/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram mr-2"></i>Instagram
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="https://vk.com/21vek.by"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-vk mr-2"></i>ВКонтакте
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
