import React from 'react';
import PropTypes from 'prop-types';
import DefaultDialog from "../StyledComponents/DefaultDialog";

export default function MrxFullErrorDialog({reference}) {
    return (
        <DefaultDialog title={'Mrx ist leider schon besetzt'} reference={reference}/>
    )
}

MrxFullErrorDialog.propTypes = {
    reference: PropTypes.func.isRequired,
};