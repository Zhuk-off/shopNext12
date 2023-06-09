import { IFooter } from '@/src/interfaces/footerHeaderRestAPIDataResponse';
import Link from 'next/link';
import Container from '../../container';

const Footer = ({ footer }: { footer: IFooter | undefined }) => {
  return (
    <footer className="bg-gray-900 py-10 text-gray-300">
      <Container>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3">
            <h3 className="mb-4 text-xl font-semibold">Контакты</h3>
            <ul className="list-none">
              <li className="mb-2">
                <i className="fas fa-map-marker-alt mr-2"></i>Адрес: г. Минск,
                ул. Суворова 22-22
              </li>
              <li className="mb-2">
                <i className="fas fa-phone mr-2"></i>Телефон: +375 29 123 45 67
              </li>
              <li className="mb-2">
                <i className="fas fa-envelope mr-2"></i>Email: info@example.com
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="mb-4 text-xl font-semibold">О компании</h3>
            <ul className="list-none">
              <li className="mb-2">
                <Link href="#" className="hover:text-red-400">
                  О нас
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-red-400">
                  Доставка и оплата
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-red-400">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="mb-4 text-xl font-semibold">Мы в соцсетях</h3>
            <ul className="list-none">
              <li className="mb-2">
                <Link
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400"
                >
                  <i className="fab fa-facebook mr-2"></i>Facebook
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400"
                >
                  <i className="fab fa-instagram mr-2"></i>Instagram
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="https://vk.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400"
                >
                  <i className="fab fa-vk mr-2"></i>ВКонтакте
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
