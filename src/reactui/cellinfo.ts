/// <reference path="../../lib/react.d.ts" />

module UIComponents
{
  
export var CellInfo = React.createClass({
  render: function()
  {
    return(
      React.DOM.div( {className:"cellinfo"}, 
        React.DOM.span(null, this.props.cell.type.type),
        React.DOM.br(null),
        React.DOM.span(null, this.props.cell.landValue),
        React.DOM.br(null),
        React.DOM.span(null, "" + this.props.cell.gridPos[0] + ", " + this.props.cell.gridPos[1])
      )
    );
  }
});

}