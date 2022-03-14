import { Field, Form, Formik } from 'formik'
import React from 'react'
import { filterType } from '../../Redux/user-reducer'

type propsType = {
  onFilterChanged: (filter: filterType) => void
}
type setSubmittingType = (isSubmitting: boolean) => void
type formType = {
  term: string
  friend: "null" | "true" | "false"
}

const UserSearch: React.FC<propsType> = (props) => {

  const onSubmit = (values: formType, { setSubmitting}: {setSubmitting: setSubmittingType}) => {
    const filter: filterType = {
      term: values.term,
      friend: values.friend === "null" ? null : values.friend === "true" ? true : false
    } 
    props.onFilterChanged(filter)
    setSubmitting(false);
  }
  
  return <Formik
    initialValues={{ term: '', friend: "null"}}
    onSubmit={onSubmit}
  >
    {({ isSubmitting }) => (
      <Form>
        <Field type="text" name="term" />
        <Field as="select" name="friend">
             <option value="null">All</option>
             <option value="true">Friends</option>
             <option value="false">Other</option>
           </Field>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    )}
  </Formik>

}
export default UserSearch