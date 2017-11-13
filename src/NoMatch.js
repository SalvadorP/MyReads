import React, {Component} from 'react';

class NoMatch extends Component {

    static contextTypes = {
      router: () => true,
    }

    render() {
        return (
            <div className="NoPage">
              <h2>Nothing here...</h2>
              <button onClick={this.context.router.history.goBack} >Go Back</button>
            </div>
        )
    }
}

export default NoMatch
