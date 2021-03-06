import React, { Component } from 'react';
import API from '../../util/API';

class Dropdown extends Component {
    constructor(props){
        super(props)
        this.state = {
          dropdown_titles: [],
          article_store: []
        }
    }

    componentDidMount(){
        API.get_articles()
            .then(result => {
              const articles = result.data.rows;

              const new_articles = [];
              articles.forEach(article => {
                new_articles.push({id: article.id, title: article.study_title})
              });

              this.setState( {dropdown_titles: new_articles, article_store: articles} )

            })
    }
    render(){
    return (
        <div class={this.props.width ? `col-${this.props.width} mx-auto`: 'col-10 mx-auto'}>
        <label for="exampleFormControlSelect1">Choose a title</label>
        <select class="form-control" id="exampleFormControlSelect1" onChange={ (e) => this.props.function(e, this.state.article_store) }>
          <option >Choose Title</option>
  
          {this.state.dropdown_titles.length > 0 ? 
            this.state.dropdown_titles.map(article => {
              return <option id={article.id}>{article.title}</option>
            })
            : ''
          }
        </select>

      </div>
    )
    }
};

export default Dropdown;