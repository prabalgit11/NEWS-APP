import React, { Component } from 'react'
import Newsitems from './Newsitems.js'
import Sipnner from './Sipnner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsApp - ${this.capitalizeFirstLetter(this.props.category)}`
    }
    async UpdateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=446359e57c5c48f18ca545bb9f7d41ca&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        let parseddata = await data.json()
        this.setState({
            articles: parseddata.articles,
            totalResults: parseddata.totalResults,
            loading: false
        })
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=446359e57c5c48f18ca545bb9f7d41ca&page=1&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parseddata = await data.json()
        // this.setState({
        //     articles: parseddata.articles,
        //     totalResults: parseddata.totalResults,
        //     loading: false
        // })
        this.UpdateNews();
    }

    handlePerClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=446359e57c5c48f18ca545bb9f7d41ca&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parseddata = await data.json()
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parseddata.articles,
        //     loading: false
        // })

        this.UpdateNews();
        this.setState({ page: this.state.page - 1 });
    }

    // handleNextClick = async () => {
    //     // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=446359e57c5c48f18ca545bb9f7d41ca&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    //     //     this.setState({ loading: true })
    //     //     let data = await fetch(url);
    //     //     let parseddata = await data.json()
    //     //     this.setState({
    //     //         page: this.state.page + 1,
    //     //         articles: parseddata.articles,
    //     //         loading: false
    //     //     })
    //     // }

    //     this.UpdateNews();
    //     this.setState({ page: this.state.page + 1 });
    // }

    fetchMoreData = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=446359e57c5c48f18ca545bb9f7d41ca&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        this.setState({ page: this.state.page + 1 })
        let data = await fetch(url);
        let parseddata = await data.json()
        this.setState({
            articles: this.state.articles.concat(parseddata.articles),
            totalResults: parseddata.totalResults,
        })

    };

    render() {

        return (
            <>
                <h1 className='text-center' style={{ marginTop: "90px" }}>News - Top headlines on {this.capitalizeFirstLetter(this.props.category)}</h1>

                {this.state.loading && <Sipnner />}
                <InfiniteScroll
                    style={{ height: "none", overflow: "none" }}
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.totalResults}
                // loader={<Sipnner />}
                >
                    <div className="container">
                        <div className="row">
                            {/* {!this.state.loading && this.state.articles.map((element) => { */}
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 my-3" key={element.url}>
                                    <Newsitems title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div >
                    </div>

                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePerClick}> &larr; Pervious</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>


        )
    }
}
