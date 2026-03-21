

const Footer = () => {

const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 border-t border-bs-gray-700 py-4">
            <div className="container-app">
                <p className="text-sm text-gray-400 text-center">SpendNote {currentYear} - Desenvolvido por <strong>João Neto</strong>.
                </p>
            </div>
        </footer>
    );
}


export default Footer;