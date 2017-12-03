import React from 'react';
import PropTypes from 'prop-types';
import DefaultDialog from "../StyledComponents/DefaultDialog";

export default function PoliceFullErrorDialog({reference}) {
    return (
        <DefaultDialog title={'Keine freien Plätze für Polizisten mehr'} reference={reference}/>
    )
}

PoliceFullErrorDialog.propTypes = {
    reference: PropTypes.func.isRequired,
};