import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
    
    const [city, setCity] = useState('');

    const handleInputChange = (event) => {
      setCity(event.target.value);
    };
  
    const handleSearch = () => {
      // Implement your search logic here
      console.log(`Searching for ${city}`);
    };
  
    const handleLocationClick = () => {
      // Implement your location logic here
      console.log('Getting user location');
    };
    function handle(){
        console.log("sdvjbsfv");
       }
  return (
    <>
           

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {/* Your SVG logo here */}
          WeatherInsight
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/facts">Weather News</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="/contact" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Contact us
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/about">About</Link></li>
                <li><Link className="dropdown-item" to="#">Another action</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="#">Something else here</Link></li>
              </ul>
            </li>
          </ul>
        
         
        </div>
      </div>
    </nav>
    </>
  )
}
