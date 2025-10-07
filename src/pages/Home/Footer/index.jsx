/** @format */

import footerLogo from '../../../assets/footer-logo.png';

const Footer = () => {
    return (
        <footer className="w-full bg-[var(--main-blue)]">
            <div className="m-auto max-w-[1440rem] mt-20 p-10 flex flex-wrap justify-between scale-90">
                <img
                    src={footerLogo}
                    alt="footer logo"
                    className="max-w-[300rem] object-cover"
                />

                <div className="text-white mt-5 text-base w-full md:w-[50%] lg:w-[20%] md:pt-[80rem] lg:pt-0">
                    <p>Horario de funcionamento</p>
                    <p>Segunda à Sexta</p>
                    <p>das 08h00 ás 18h00 (Horário de Brazilia)</p>
                </div>

                <div className="text-white mt-5 text-base flex flex-col gap-7 w-full md:w-[50%] lg:w-[30%]">
                    <div>
                        <p>Whatsapp: +55 19 98136-1910</p>
                        <p>Telefone: +55 19 99422-1994</p>
                        <p>Comercial: contato@reduzzi.com.br</p>
                    </div>

                    <div>
                        <p>R. Dom Bosco, 789</p>
                        <p>Vila Santa Catarina</p>
                        <p>Americana - SP, 13466-327</p>
                    </div>
                </div>

                <div className="text-white font-medium mt-5 text-base w-full md:w-[50%] lg:w-[20%]">
                    <p>{'>'} Quem somos</p>
                    <p>{'>'} Duvidas</p>
                    <p>{'>'} FAQ</p>
                    <p>{'>'} Meus Pedidos</p>
                    <p>{'>'} Política de privacidade</p>
                    <p>{'>'} Contato</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
