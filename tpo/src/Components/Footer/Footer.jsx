import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

const Footer = () => {
  return (
    <MDBFooter className='bg-dark text-center text-white'>
      <MDBContainer className='p-4 pb-0'>
        <section className='mb-4'>
          <MDBBtn outline color="light" floating className='m-1' href='https://www.facebook.com/profile.php?id=61559052163323' target="_blank" role='button'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://twitter.com/FestTicketTrust' target="_blank" role='button'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#' target="_blank" role='button'>
            <MDBIcon class="far fa-envelope"/> {/* Este podria enviarte a una pagina en la cual nos pueda contar su experiencia  */}
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='https://www.instagram.com/festtickets11/' target="_blank" role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://www.youtube.com/' target="_blank"  role='button'>
            <MDBIcon fab icon='youtube' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://github.com/ElishebaTawil/AppIntG1-Front' target="_blank" role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      <p>Copyright @2024 - Todos Los Derechos Reservados</p>
                <p>TP APIS Integrantes: Maximo Rosso - Elisheba Tawil - Tadeo Pinque - Sebastian Sosa - Maurico Huentelaf  </p>
      </div>
    </MDBFooter>
  );
}
export default Footer;