function Fruits() {
    const fruitNames = ["Melocoton", "fresa", "Mango"]


    return (
        <>
            <h1> listado de frutas</h1>
            {
                fruitNames.map((item, index) => {
                    return <p key={index}>{item}</p>

                }
                )
            }

        </>


    )
}

export default Fruits