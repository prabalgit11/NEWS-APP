import React, { Component } from 'react'

export class Newsitems extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props
        return (
            <div>
                <div className="card" >
                    <div>
                        <span className="badge rounded-pill bg-danger" style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: "0" }}>{source}</span>
                    </div>
                    <img src={!imageUrl ? "https://c.ndtvimg.com/2023-10/hii8n5ng_ring-of-fire-annual-solar-eclipse_625x300_08_October_23.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {!author ? " Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitems
