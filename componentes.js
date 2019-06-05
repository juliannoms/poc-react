// formulário de pesquisa
class FormPesquisa extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      valor : '',
      valor2 : '',
    }
  }
  render(){
    return (
      <>
        <label>CNPJ:</label>
        <input type="text" value={this.state.valor} onChange={ (e) => this.setState({ valor : e.target.value })} />
        <br />
        <label>CPF:</label>
        <input type="text" value={this.state.valor2} onChange={ (e) => this.setState({ valor2 : e.target.value })} />
        <br />
        <button onClick={() => this.props.pesquisar(this.state.valor, this.state.valor2) } >Pesquisar</button>
      </>
    );
  }
}

// componente container que acessa o backend e controla o resultado da pesquisa
class SpanContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      quantidadeRenderizacoes : 0,
      renderiza : false,
    }
  }
  
  componentDidMount(){
    // se o termo para pesquisa não for vazio
    if(this.props.texto)
      // aciona o backend
      this.setState({ 
        renderiza : true,
        quantidadeRenderizacoes : 1,
      })  
  }
  
  componentDidUpdate(prevProps){
    // se o termo para pesquisa foi alterado e o novo não for vazio
    if(prevProps.texto !== this.props.texto && this.props.texto){
      // aciona o backend
      this.setState( { 
        quantidadeRenderizacoes : this.state.quantidadeRenderizacoes + 1,
        renderiza : true,
      })
    }
  }
  
  render(){
    //controla se o html de resultado deve ser renderizado ou não
    return this.state.renderiza && <Span texto={'quantidadeRenderizacoes ' + this.state.quantidadeRenderizacoes} />
  }
}

// componente que mostra o resultado da pesquisa
function Span(props){
  return (<span>{props.texto}</span>);
}

// componente pai responsável por controlar o estado dos componentes
class Pagina extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      valorPesquisa : '',
      valorPesquisa2 : '',
    }
  }
  render(){
    return (
      <>
        <FormPesquisa pesquisar={ (valor, valor2) => this.setState({ valorPesquisa : valor, valorPesquisa2 : valor2 })}></FormPesquisa>
        <br />
        <span>CNPJ: </span>
        <SpanContainer texto={this.state.valorPesquisa} />
        <br />
        <span>CPF: </span>
        <SpanContainer texto={this.state.valorPesquisa2} />
      </>
    )
  }
}

// ========================================

ReactDOM.render(<Pagina />, document.getElementById("root"));

// https://codepen.io/
