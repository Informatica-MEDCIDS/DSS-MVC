import { ObservationDTO } from '../dtos/fhir/observation/ObservationDTO';

export function mapObservation(resource: any): ObservationDTO {

  return {

    id: resource.id,

    status: resource.status,

    code: resource.code?.coding?.[0]?.code || '',

    display: resource.code?.coding?.[0]?.display || resource.code?.text || '',

    value: resource.valueQuantity?.value ?? '',

    unit: resource.valueQuantity?.unit || resource.valueQuantity?.code || '',

    effectiveDateTime: resource.effectiveDateTime || '',

    subject: resource.subject?.reference || ''

  };

}

export function mapObservationHumanData(resource: any): ObservationDTO {

  return {

    id: resource.id,

    status: resource.status,

    code: resource.code?.coding?.[0]?.code || '',

    display: resource.code?.coding?.[0]?.display || resource.code?.text || '',

    value: resource.valueQuantity?.value ?? '',

    unit: resource.valueQuantity?.unit || resource.valueQuantity?.code || '',

    effectiveDateTime: formatarDataPortuguesa(resource.effectiveDateTime),

    subject: resource.subject?.reference || ''

  };

}

function formatarDataPortuguesa(dataFHIR?: string): string {

  if (!dataFHIR) return '';

  return new Date(dataFHIR).toLocaleString('pt-PT', {

    timeZone: 'Europe/Lisbon',

    year: 'numeric',

    month: '2-digit',

    day: '2-digit',

    hour: '2-digit',

    minute: '2-digit'

  });

}