import { Component } from 'react'

export default class TiposEventos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lista: [{id: 1, titulo: 'Teste1'}, {id: 2, titulo: 'Teste2'}],
            titulo: '',
            idAlterado: 0
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

        if (this.state.idAlterado !== 0) {
            fetch('http://localhost:5000/api/tiposeventos/' + this.state.idAlterado, {
                
                //Define o método da request
                method: 'PUT',
    
                //Define o corpo da request especificando o tipo
                //ou seja, converte o state titulo para uma string JSON
                body: JSON.stringify({ titulo: this.state.titulo}),
    
                //Define o cabeçalho da request
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.status === 204) {
                    console.log(this.state.idAlterado, this.state.titulo);
                }
            })
            .then(this.buscarTiposEventos)
            .then(this.limpaCampos)
        } else {
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
            .then(this.buscarTiposEventos)
            .then(this.limpaCampos)       
        }
    }

    // Chama a função buscarTiposEventos assim que o componente é renderizado
    componentDidMount() {
        this.buscarTiposEventos()
    }

    buscarTipoEventoPorId = (tipoEvento) => {
        this.setState({
            idAlterado: tipoEvento.id,
            titulo: tipoEvento.titulo
        }, () => {
            console.log(this.state.idAlterado, this.state.titulo);
        })
    }

    deletaTipoEvento = (tipoEvento) => {
        fetch('http://localhost:5000/api/tiposeventos/' + this.state.idAlterado, {
                
            //Define o método da request
            method: 'DELETE',
        })
        .then(response => {
            if (response.status === 204) {
                console.log('Tipo de evento' + tipoEvento.id +'deletado')
            }
        })
        .catch(error => console.log(error))
        .then(this.buscarTiposEventos)
    }

    //Reseta os status titulo e id
    limpaCampos = () => {
        this.setState({
            titulo: '',
            idAlterado: 0
        })
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
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.lista.map(te => {
                                        return (
                                            <tr key={te.id}>
                                                <td>{te.id}</td>
                                                <td>{te.titulo}</td>
                                                
                                                <td><button onClick={() => this.buscarTipoEventoPorId(tipoEvento)}>Editar</button></td>
                                                <td><button onClick={() => this.deletaTipoEvento(tipoEvento)}>Deletar</button></td>
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

                                <button type = 'submit' disabled = {this.state.titulo === '' ? 'none' : ''}>
                                    {this.state.idAlterado === 0 ? 'Cadastrar' : 'Atualizar'}
                                </button>

                                <button type = 'submit' onClick = {this.limpaCampos}>Cancelar</button>
                            </div>
                        </form>

                        {
                            this.state.idAlterado !== 0 && 
                            <div>
                                <p>O tipo de evento {this.state.idAlterado} está sendo alterado</p>
                                <p>Clique em cancelar caso queira cancelar a operação e cadastrar outro tipo de evento</p>                             
                            </div>
                        }
                    </section>
                </main>    
            </div>
        )
    }
}