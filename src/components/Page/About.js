import { Link } from "react-router-dom";
import backgroundPattern from '../../images/background-pattern.jpg';
function About() {
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">About Us</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" href="#">Home</Link>
                            <Link className="breadcrumb-item nav-link" href="#">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">About Us</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="company-detail py-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <blockquote>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus leo vel orci malesuada, id
                                sodales em volutpat.</blockquote>
                            <p><strong>Vivamus sagittis pulvinar dignissim.</strong> Mauris tempus a lacus eu aliquet. Mauris gravida at
                                ectus quis venenatis. Aenean quis feugiat turpis. Etiam lacinia interdum nibh, non convallis magna lementum
                                vel. Phasellus varius quam ligula, in lobortis risus porttitor ut. Praesent ipsum elit, lobortis n tincidunt
                                Vestibulum ut ros sed enim feugiat lobortis. Suspendisse fermentum nunc in est mattis molestie. Mauris ut
                                placerat isus. Aenean mollis neque libero, ut pellentesque arcu dapibus vel.</p>
                            <p>Praesent nec nisl euismod, lacinia tellus eget, bibendum ex. Maecenas imperdiet gravida pulvinar. aecenas
                                feugiat id tellus sed sodales. Praesent maximus ultricies elit eget accumsan. Proin tortor ante, ltrices a
                                aliquet a, facilisis quis sapien. Donec eu turpis at velit scelerisque faucibus id eget dolor. tiam lobortis
                                ante ipsum, sed venenatis ligula facilisis quis. Fusce blandit commodo mauris, sed fringilla isi congue et.
                                Nunc eu eros ex.</p>
                        </div>
                    </div>
                    <h2>About Foodmart Team</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                laborum. Sed ut perspiciatis unde omnis iste.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                                anim id est laborum. Sed ut perspiciatis unde omnis iste.</p>
                        </div>
                        <div className="col-md-4">
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                laborum. Sed ut perspiciatis unde omnis iste.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                                anim id est laborum. Sed ut perspiciatis unde omnis iste.</p>
                        </div>
                        <div className="col-md-4">
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                laborum. Sed ut perspiciatis unde omnis iste.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                                anim id est laborum. Sed ut perspiciatis unde omnis iste.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default About;