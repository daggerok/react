import React from 'react';

export default props => ({

  render() {

    const {
      get,
      dispatchPlus,
      dispatchMinus,
      dispatchDiv,
      dispatchMult,
    } = this.props;

    return (
      <div>
        <h4>sum store</h4>
        <fieldset>
          <input ref='inputPlus' type='number' placeholder='plus action'/>
          <button onClick={() => dispatchPlus(get(this.refs['inputPlus']))}>plus</button>
          <br/>

          <input ref='inputMinus' type='number' placeholder='minus action'/>
          <button onClick={() => dispatchMinus(get(this.refs['inputMinus']))}>minus</button>
          <br/>

          <input ref='inputDiv' type='number' placeholder='div action'/>
          <button onClick={() => dispatchDiv(get(this.refs['inputDiv']))}>div</button>
          <br/>

          <input ref='inputMult' type='number' placeholder='mult action'/>
          <button onClick={() => dispatchMult(get(this.refs['inputMult']))}>mult</button>
        </fieldset>
      </div>
    );
  }
});
