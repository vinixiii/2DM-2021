import { Component } from 'react'

export default class TiposEventos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lista: [],
            titulo: ''
        }
    }

    buscarTiposEventos = () => {
        console.log('Fui chamado!');

        // Faz a chamada para API usando fetch
        fetch('http://localhost:5000/api/tiposeventos')
            .then(response => {response.json()})
            .then(data => {this.setState({lista: data})})
            .catch(error => console.log(error))
    }

    //Atualiza o estado do titulo com o valor do input
    updateState = (event) => {
        this.setState({titulo: event.target.value})
    }

    //Envia o form e cadastra um tipo de evento
    handleSubmit = (event) => {
        event.preventDefault()

        fetch('http://localhost:5000/api/tiposeventos', {
            
            //Define o método da request
            method: 'POST',

            //Define o corpo da request especificando o tipo
            //ou seja, converte o state titulo para uma string JSON
            body: JSON.stringify({ titulo: this.state.titulo}),

            //Define o cabeçalho da request
            headers: {
                'Content-Type': 'application/json' 
            }
        })
            .then(console.log('Tipo de evento cadastrado'))
            .catch(error => console.log(error))
    }

    // Chama a função buscarTiposEventos assim que o componente é renderizado
    componentDidMount() {
        this.buscarTiposEventos()
    }

    render() {
        return (
            <div>
                <main>
                    <section>
                        <h2>Lista de tipos de eventos</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Título</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.lista.map(te => {
                                        return (
                                            <tr key={te.id}>
                                                <td>{te.id}</td>
                                                <td>{te.titulo}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </section>

                    <section>
                        <h2>

                        </h2>

                        <form onSubmit={this.handleSubmit}>
                            <h2>Cadastrar tipo de evento</h2>
                            <div>
                                <input 
                                    type = 'text'
                                    value = {this.state.titulo}
                                    onChange = {this.updateState}
                                    placeholder = 'Título'
                                />
                                <button type = 'submit'>Cadastrar</button>
                            </div>
                        </form>
                    </section>
                </main>    
            </div>
        )
    }
}