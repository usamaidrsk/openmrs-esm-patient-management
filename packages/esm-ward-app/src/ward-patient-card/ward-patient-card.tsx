import React from 'react';
import { useParams } from 'react-router-dom';
import { type WardPatientCardProps } from '../types';
import { usePatientCardRows } from './ward-patient-card-row.resources';
import styles from './ward-patient-card.scss';
import { getPatientName, launchWorkspace } from '@openmrs/esm-framework';
import classNames from 'classnames';

const WardPatientCard: React.FC<WardPatientCardProps> = (props) => {
  const { locationUuid } = useParams();
  const patientCardRows = usePatientCardRows(locationUuid);

  return (
    <div className={styles.wardPatientCard}>
      {patientCardRows.map((WardPatientCardRow, i) => (
        <WardPatientCardRow key={i} {...props} />
      ))}
      <button
        className={classNames(styles.wardPatientCardButton, {
          // [styles.activeWardPatientCardButton]:
          //   activeBedSelection?.bed.uuid === props.bed?.uuid &&
          //   activeBedSelection?.patient.uuid === props.patient?.uuid,
        })}
        onClick={() => {
          launchWorkspace('ward-patient-notes-workspace', { ...props });
        }}>
        {/* Name will not be displayed; just there for a11y */}
        {getPatientName(props.patient.person)}
      </button>
    </div>
  );
};

export default WardPatientCard;
