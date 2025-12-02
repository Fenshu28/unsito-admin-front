const FormTipos = () => {
    return (
        <div>
            <div>
                <label for="Eventos">Selecciona un evento:</label>

                <select name="Eventos" id="cars">
                    <option value="Noticia">Noticia</option>
                    <option value="Aviso">Aviso</option>
                    <option value="Evento">Evento</option>
                    <option value="Convocatoria">Convocatoria</option>
                </select>
            </div>
        </div>
    )
}

export default FormTipos;