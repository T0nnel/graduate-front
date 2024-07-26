import './footer.css'

export const Footer = () => {
    return (
       <div className='container'>
       <footer>
        <a href=""><img src="/images/img9.png" alt="" /></a>
        <p>Ecomy is an innovative eCommerce platform that revolutionizes online shopping with its user-friendly interface and customizable storefronts. It provides advanced analytics to boost sales and secure payment options for peace of mind. Ecomy excels in inventory management and offers a responsive design, ensuring businesses can thrive in the digital marketplace. Its intuitive tools enhance customer satisfaction by streamlining the shopping experience and optimizing business operations. Whether you're a small business or a large enterprise, Ecomy’s comprehensive features are designed to elevate your online presence and drive success in the competitive eCommerce landscape.</p>
        <div className="contents">
        <a href="https://www.instagram.com/"><img src="/images/insta.png" alt="" /></a>
        <a href="https://twitter.com/"><img src="/images/twitter.png" alt="" /></a>
        <a href="https://youtube.com/"><img src="/images/youtube.png" alt="" /></a>
        <a href="https://web.whatsapp.com/"><img src="/images/whatsapp.png" alt="" /></a>
        </div>
        <p>Copyright © 2024 Ecomy, Inc. All Rights Reserved.</p>
    {/*     <ul>
        <li><Link to={'/home'}>Home</Link></li>
        <li><Link to={'/'}>Contact Us</Link></li>
        <li ><Link to={'/register'}>Sign Up</Link></li>
        <li ><Link to={'/login'}>Log In</Link></li>
            </ul> */}
    </footer>
    </div>

    )
}