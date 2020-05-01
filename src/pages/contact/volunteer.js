/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { graphql } from 'gatsby'
import { Button } from '../../components/common/button'
import Layout from '../../components/layout'
import Form from '../../components/common/form'
import DetailText from '../../components/common/detail-text'
import formStyles from '../../components/common/form.module.scss'

const workstreams = [
  'Program Management / Operations ',
  'Community Management ',
  'Editorial',
  'Reporting',
  'Outreach',
  'Data Entry ',
  'Data Entry - Racial Data',
  'Data Entry - State Grades',
  'Data Entry - Documentation',
  'Technical Infrastructure',
  'API',
  'Website Development',
  'Website Design',
]
export default ({ data }) => (
  <Layout title="Volunteer" textHeavy narrow>
    <div
      dangerouslySetInnerHTML={{
        __html:
          data.allContentfulSnippet.edges[0].node
            .childContentfulSnippetContentTextNode.childMarkdownRemark.html,
      }}
    />
    <Form name="volunteer-form">
      <input type="hidden" name="form-name" value="volunteer-form" />
      <div className={formStyles.formGroup}>
        <label htmlFor="volunteer-name">
          Your name
          <input type="text" name="name" id="volunteer-name" required />
        </label>
      </div>
      <div className={formStyles.formGroup}>
        <label htmlFor="volunteer-email">
          Your email address
          <input type="email" name="email" id="volunteer-email" required />
        </label>
        <DetailText>
          If possible, this should be a Gmail or Google-linked address, since we
          rely heavily on Google Docs and Sheets. We will show your email
          internally to other volunteers but will not share it elsewhere.
        </DetailText>
      </div>
      <div className={formStyles.formGroup}>
        <label htmlFor="volunteer-website">
          Your personal website
          <input type="text" name="website" id="volunteer-website" required />
        </label>
      </div>
      <div className={formStyles.formGroup}>
        <label htmlFor="volunteer-skills">
          Specialization or skills
          <input type="text" name="skills" id="volunteer-skills" required />
        </label>
        <DetailText>
          Examples: Editing, social media, public health, research, journalism,
          web development, databases, etc.
        </DetailText>
      </div>
      <div className={formStyles.formGroup}>
        <fieldset>
          <label>Which workstream or project would you like to apply to?</label>
          {workstreams.map((name, id) => (
            <label htmlFor={`workstream-${id}`}>
              <input
                type="checkbox"
                value={name}
                name={name}
                id={`workstream-${id}`}
              />
              {name}
            </label>
          ))}
        </fieldset>
      </div>
      <div className={formStyles.formGroup}>
        <label htmlFor="volunteer-hours">
          How many hours are you available to work per week?
          <select id="volunteer-hours" name="volunteer-hours">
            {['1-5', '5-10', '10-20', '20-30', '30-40', '40+'].map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={formStyles.formGroup}>
        <label htmlFor="volunteer-timezone">
          What time zone are you in?
          <select id="volunteer-timezone" name="volunteer-timezone">
            {['Pacific', 'Mountain', 'Central', 'Eastern', 'Other'].map(
              name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ),
            )}
          </select>
        </label>
      </div>
      <div className={formStyles.formGroup}>
        <label htmlFor="volunteer-availability">
          When are you most available to work?
          <select id="volunteer-availability" name="volunteer-availability">
            {[
              'Morning, some or all weekdays',
              'Afternoon, some or all weekdays',
              'Evening, some or all weekdays',
              'Weekends',
            ].map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={formStyles.formGroup}>
        <label htmlFor="volunteer-referred">
          Who were you referred by?
          <input type="text" name="referred" id="volunteer-referred" required />
        </label>
      </div>

      <div className={formStyles.formGroup}>
        <label htmlFor="volunteer-interest">
          Why are you interested in volunteering for us?
          <textarea
            type="text"
            name="interest"
            id="volunteer-interest"
            required
          />
        </label>
      </div>

      <div className={formStyles.botField}>
        <label htmlFor="covid-bot-field">
          If you are a human, don&apos;t fill out this field:
          <input type="text" name="covid-bot-field" id="covid-bot-field" />
        </label>
      </div>
      <div className={formStyles.formGroup}>
        <Button type="submit">Sign up to volunteer</Button>
      </div>
    </Form>
  </Layout>
)

export const query = graphql`
  query {
    allContentfulSnippet(filter: { slug: { eq: "volunteer-form" } }) {
      edges {
        node {
          childContentfulSnippetContentTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
