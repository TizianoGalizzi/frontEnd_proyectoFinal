

export default function Footer(){ 
    return(
        <>
        <footer>
      <div className="flexFooter-container">
        <div className="footer-contain">
          <ul>
            <li className='footer-li'><i className="fa fa-phone"></i>+54 376 4281042</li>
            <li className='footer-li'>
              <i className="fa-solid fa-envelope"></i>info@siliconmisiones.gob.ar
            </li>
            <li className='footer-li'>
              <i className="fa-solid fa-location-dot"></i>San Lorenzo 2023 3300,
              Posadas
            </li>
          </ul>
        </div>
        <div className="footer-contain">
          <ul>
            <li>
              <a href="#" className="footer-link"
                ><i className="fa fa-arrow-right"></i>Sobre nosotros</a>
            </li>
            <li>
              <a href="#" className="footer-link"
                ><i className="fa fa-arrow-right"></i>Contacto</a>
            </li>
            <li>
              <a href="#" className="footer-link"
                ><i className="fa fa-arrow-right"></i>FQA</a>
            </li>
          </ul>
        </div>
      </div>
      <li className="copyR">&copy SiliconMisiones 2023</li>
    </footer>
        </>
    )
}