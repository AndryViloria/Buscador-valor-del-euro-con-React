import { useEffect, useState } from "react"

const MiApi = () => {
    const [allData, setAllData] = useState([])
    const [data, setData] = useState([])
    const [value, setValue] = useState("")
    const [order, setOrder] = useState("reciente")

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        filterData()
    }, [value])

    useEffect(() => {
        const sorted = sortData(data)
        setData(sorted)
    }, [order])

    const getData = () => {
        const url = 'https://mindicador.cl/api/euro'
        fetch(url)
            .then((res) => res.json())
            .then((json) => {

                const sorted = sortData(json.serie)

                setAllData(sorted)
                setData(sorted) 
            })
            .catch((e) => console.log(e))
    }

    const filterData = () => {
        const search = value.toLowerCase()
        const filtered = allData.filter((serie) => {
            const fecha = serie.fecha

            return fecha.includes(search)
        })

        const sorted = sortData(filtered)
        setData(sorted)
    }

    const sortData = (data) => {
        const sortedData = [...data]

        if (order === 'reciente') {
            sortedData.sort((a, b) => a.fecha.localeCompare(b.fecha))
        } else {
            sortedData.sort((a, b) => b.fecha.localeCompare(a.fecha))
        }

        return sortedData
    }

    return (
        <main>
            <h2>Buscador del Valor del Euro (€)</h2>
            <div className="inputs">
                <input className="input" type="text" placeholder="Buscar por fecha (Formato yyyy-mm-dd)" onChange={(e) => setValue(e.target.value)} />

                <select onChange={(e) => setOrder(e.target.value)}>
                    <option value="reciente">Más Antigua</option>
                    <option value="antiguo">Más Reciente</option>
                </select>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Valor (Peso Chileno $)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((serie) => {
                            return (
                                <tr key={serie.fecha}>
                                    <td>{serie.fecha}</td>
                                    <td>{serie.valor}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </main>
    )
}

export default MiApi