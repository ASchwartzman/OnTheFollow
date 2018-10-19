function Book (key, title, resultadosPossiveis, settleDate) {
    this.key = key
    this.title = title
    this.resultadosPossiveis = resultadosPossiveis
    this.settleDate = settleDate
    this.resultado = null
    
    this.setResultado = (resultado) => {
        if ( this.resultadosPossiveis.includes(resultado) ){
            this.resultado = resultado
            return `Resultado: ${this.resultado}`
        } else {
            return 'Resultado Inválido'
        }
    }

    this.addResultadoPossivel = (resultadoPossivel) => {
        this.resultadosPossiveis.push(resultadoPossivel)
    }

    this.deleteResultadoPossivel = (resultadoPossivel) => {
        if ( !this.resultadosPossiveis.includes(resultadoPossivel) ) {
            return
        }
        this.resultadosPossiveis = this.resultadosPossiveis.filter(
            resultado => resultado !== resultadoPossivel
        )
    }
}


function Boleta (book, tradeDate, ativo, contraparte, operation, lote, tradePrice, liquidado = false, settle = null, comentarios = null) {
    this.book = book
    this.tradeDate = tradeDate
    this.ativo = this.book.resultadosPossiveis.includes(ativo) ? ativo : null
    this.contraparte = contraparte
    this.operation = (operation == 'C' || operation == 'V') ? operation : null
    this.lote = lote
    this.tradePrice = tradePrice
    this.liquidado = liquidado
    this.resultadosPossiveis = this.book.resultadosPossiveis
    this.vencimento = settle || this.book.settleDate
    this.comentarios = comentarios || ''
    this.actualPrice = tradePrice

    this.setBook = (book) => {
        this.book = book
    }
    this.setTradeDate = (date) => {
        this.tradeDate = date
    }
    this.setAtivo = (ativo) => {
        this.ativo = book.resultadosPossiveis.includes(ativo) ? ativo : this.ativo
    }
    this.setContraparte = (contraparte) => {
        this.contraparte = contraparte
    }
    this.setoperation = (operation) => {
        this.operation = (operation == 'C' || operation == 'V') ? operation : this.operation
    }
    this.setLote = (lote) => {
        this.lote = lote
    }
    this.setTradePrice = (tradePrice) => {
        this.tradePrice = tradePrice
    }
    this.toggleLiquidado = () => {
        this.liquidado = !this.liquidado
    }
    this.setVencimento = (vencimento) => {
        this.vencimento = vencimento || this.book.settleDate
    }
    this.setComentarios = (comentarios) => {
        this.comentarios = comentarios
    }
    this.setActualPrice = (price) => {
        this.actualPrice = price
    }

    this.calcularMtM = () => {
        let lote = (this.operation === 'C') ? this.lote : -this.lote
        let pnl = lote * (this.actualPrice - this.tradePrice)
        return pnl
    }

    this.calcularPNLFinal = () => {
        if (!this.book.resultado) {
            return 'Resultado do evento não determinado'
        }
        let letlote = (this.operation === 'C') ? this.lote : -this.lote
        let precoFinal = (this.book.resultado === this.ativo) ? 100 : 0
        let pnl = lote * (precoFinal - this.tradePrice)
        return pnl
    }
}

export { Book , Boleta }