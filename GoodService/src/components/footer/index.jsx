import './styles.css'

const Footer = () =>{
    return(
        <footer>

          
            <div className="footer-bottom">

            <p>Copyright &copy <span id="year"></span> <a href="#">@coding_dev_</a> </p>

            <div className="footer-menu">

                <ul className="f-menu">

                <li><a href="">Home</a></li>

                <li><a href="">About</a></li>

                <li><a href="">Contact</a></li>

                <li><a href="">Blog</a></li>

                </ul>

            </div>

            </div>

        </footer>
    )
}
export default Footer