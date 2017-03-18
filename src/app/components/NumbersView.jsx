import React from 'react';

export default props => ({

  render() {

    const {
      get,
      dispatchAdd,
      dispatchUpdate,
      dispatchRemove,
    } = props;

    return (
      <div>
        <h4>numbers store</h4>
        <fieldset>
          <input ref='inputAdd' type='number' placeholder='add action'/>
          <button onClick={() => dispatchAdd(get(this.refs['inputAdd']))}>add</button>
          <br/>

          <label htmlFor='id'>id </label>
          <input ref='inputUpdateId' id='id' type='number' placeholder='update id'/>

          <label htmlFor='value'>value </label>
          <input ref='inputUpdateValue' id='value' type='number' placeholder='new value'/>

          <button onClick={() => dispatchUpdate(
            get(this.refs['inputUpdateId']),
            get(this.refs['inputUpdateValue']),
          )}>update</button>
          <br/>

          <input ref='inputRemove' type='number' placeholder='remove action'/>
          <button onClick={() => dispatchRemove(get(this.refs['inputRemove']))}>remove</button>
        </fieldset>
      </div>
    );
  }
});
