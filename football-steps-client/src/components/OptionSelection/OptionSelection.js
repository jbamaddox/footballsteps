import React, { Component } from 'react';

class OptionSelection extends Component {

    returnSubstitutionOptions = (floatLeftRight, id, labelTitle, selectValue, arrayOfOptions) => {
        let labelToReturn = null
        let optionsToReturn = null


        if (arrayOfOptions === null || arrayOfOptions.length === undefined || arrayOfOptions.length === 0) {

            labelToReturn = (null)
            optionsToReturn = (
                <div style={{ width: '50%', float: `${floatLeftRight}`, textAlign: 'center', marginTop: '10px', height: '2em', color: 'rgba(125, 125, 125, .5)' }} >No {labelTitle} Options</div>
            )

        } else {

            labelToReturn = (<label htmlFor={id} >{labelTitle}</label>)
            optionsToReturn = (
                <div style={{ width: '50%', float: `${floatLeftRight}`, textAlign: 'center', marginTop: '5px' }}>
                    {labelToReturn}
                    <br />
                    <select
                        id={id}
                        value={selectValue || 'default'}
                        style={{ borderColor: 'rgb(245,245,245)', cursor: 'pointer', outline: 'none' }}
                        onChange={(event) => event.target.value !== 'default' ? this.props.onChangeFunction(event) : null}
                    >
                        <option
                            value="default"
                            key={999999999999}
                        >Select {labelTitle}</option>
                        {arrayOfOptions}
                    </select>
                </div >

            )
        }


        return optionsToReturn
    }


    render() {

        return (

            this.returnSubstitutionOptions(
                this.props.floatLeftRight,
                this.props.id,
                this.props.labelTitle,
                this.props.selectValue,
                this.props.arrayOfOptions
            )

        )
    }
}


OptionSelection.defaultProps = {
    floatLeftRight: 'left',
    id: 'substitutionId',
    labelTitle: 'labelTitle',
    selectValue: null,
    arrayOfOptions: null,
    onChangeFunction: null
}


export default OptionSelection