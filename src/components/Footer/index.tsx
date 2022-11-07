import { Link } from "react-router-dom";

const links = [
  { name: "Browse Users", link: "search/allusers/multi" },
  { name: "Browse Lists", link: "search/alllists/multi" },
  { name: "Browse Users", link: "search/allusers/multi" },
];

const socials = [
  { link: "https://github.com/draganstefanovic12", img: "/github.svg", name: "GitHub" },
  {
    link: "https://www.linkedin.com/in/dragan-stefanovic-0067a5215/",
    img: "/in.png",
    name: "LinkedIn",
  },
  { name: "stefanovicdragan112@gmail.com", img: "/mail.svg" },
];

const Footer = () => {
  return (
    <footer>
      <div className="footer-cont">
        <ul className="footer-links">
          {links.map((link, i) => (
            <Link className="footer-link" to={link.link} key={i}>
              {link.name}
            </Link>
          ))}
        </ul>
        <ul className="footer-links">
          {socials.map((social) => (
            <li onClick={() => window.open(social.link)} className="footer-socials">
              <img className="footer-img" src={`${social.img}`} alt="social" />
              <p data-content={social.img}>{social.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
