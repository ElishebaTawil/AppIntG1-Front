import './BotonesParty.css'

const BotonesParty = (props) => {
    const {party} = props;

  return (
    <div className='barraBotones'>
        <div className='boton'>
            <select id='fecha' className='estiloBoton'>
                <option selected>{party.fecha}</option>
            </select>

        </div>
        <div className='boton'>
            <select id='hora' className='estiloBoton'>
                <option selected>{party.hora}</option>
            </select>

        </div>
        <div className='boton'>
            <select id='lugar' className='estiloBoton'>
                <option selected>{party.lugar}</option>
                <option>{party.ubicacion}</option>
            </select>

        </div>
        <div className='boton'>
            <select id='precio' className='estiloBoton'>
                <option selected>{'$'+party.new_price}</option>
            </select>

        </div>
        <div className='boton'>
            <select id='cantidad' className='estiloBoton'>
                <option selected>1</option>
                <option selected>2</option>
                <option selected>3</option>
                <option selected>4</option>
            </select>

        </div>
    </div>
    
  )
}

export default BotonesParty
