import React from 'react'
import algoliasearch from 'algoliasearch'
import NProgress from 'nprogress'
import each from 'lodash/each'
import truncate from 'lodash/truncate'
import { prefixSearchIndex } from '../utilities/algolia'

export const types = {
  STATE: 'state',
  PAGE: 'page',
  BLOG_POST: 'blogPost',
}

const initialState = {
  query: '',
  results: {
    [types.STATE]: {},
    [types.BLOG_POST]: {},
    [types.PAGE]: {},
  },
  isFetching: false,
  hasErrors: false,
  errors: [],
  autocompleteHasFocus: false,
}

const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY,
)

const stateIndex = client.initIndex(prefixSearchIndex(types.STATE))
const blogIndex = client.initIndex(prefixSearchIndex(types.BLOG_POST))
const pageIndex = client.initIndex(prefixSearchIndex(types.PAGE))

const SearchStateContext = React.createContext()

const SearchDispatchContext = React.createContext()

function searchReducer(state, action) {
  switch (action.type) {
    default:
      throw new Error(`Unknown action type: ${action.type}.`)
    case 'setQuery':
      return {
        ...state,
        query: action.payload,
      }
    case 'clearQuery':
      return {
        state: initialState,
        isFetching: false,
      }
    case 'fetchStart':
      return {
        ...state,
        isFetching: true,
        hasErrors: false,
        errors: [],
      }
    case 'fetchError':
      return {
        ...state,
        isFetching: false,
        hasErrors: true,
        errors: [...state.errors, action.error],
      }
    case 'fetchSuccess':
      return {
        ...state,
        isFetching: false,
        results: action.payload,
      }
    case 'toggleAutocompleteFocus':
      return {
        ...state,
        autocompleteHasFocus: !state.autocompleteHasFocus,
      }
  }
}

export function SearchProvider({ children }) {
  const [state, dispatch] = React.useReducer(searchReducer, initialState)

  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  )
}

export function useSearchState() {
  const context = React.useContext(SearchStateContext)
  if (context === undefined) {
    throw new Error('useSearchState must be used within a SearchProvider')
  }
  return context
}

export function useSearchDispatch() {
  const context = React.useContext(SearchDispatchContext)
  if (context === undefined) {
    throw new Error('useSearchDispatch must be used within a SearchProvider')
  }
  return context
}

export function useSearch() {
  return [useSearchState(), useSearchDispatch()]
}

async function queryIndex(index, query) {
  try {
    const hits = await index.search(query)

    return hits
  } catch (e) {
    // TODO client-side error reporting?
    console.error(e) // eslint-disable-line
    return []
  }
}

export async function querySearch(s, dispatch) {
  dispatch({ type: 'fetchStart' })
  try {
    const [state, blogPost, page] = await Promise.all([
      queryIndex(stateIndex, s.query),
      queryIndex(blogIndex, s.query),
      queryIndex(pageIndex, s.query),
    ])
    NProgress.done()
    dispatch({ type: 'fetchSuccess', payload: { state, blogPost, page } })
  } catch (error) {
    dispatch({ type: 'fetchError', error })
  }
}

export function getHighlightResultOrExcerpt(hitType, hit) {
  switch (hitType) {
    default:
      return ''
    case 'state':
      return truncate(hit.notes.replace(/(<([^>]+)>)/gi, ''), {
        length: 200,
      })
    case 'page':
      /* eslint-disable no-underscore-dangle */
      return hit._snippetResult.body && hit._snippetResult.body.value
        ? hit._snippetResult.body.value.replace(/(<([^>]+)>)/gi, '')
        : truncate(hit.body).replace(/(<([^>]+)>)/gi, '')
    /* eslint-enable no-underscore-dangle */
  }
}

/**
 * Mitigate missing/present first "/" issue in routes.
 * @param {*} type
 *  A value in `types` matching this result item.
 * @param {*} item
 *  The result item.
 */
export function getSanitizedSlug(type, item) {
  if (!Object.values(types).includes(type)) {
    throw new Error(`Invalid search result type: ${type}`)
  }
  const setTrailingIfMissing = slug => (slug[0] === '/' ? slug : `/${slug}`)

  switch (type) {
    default:
      return item.slug || ''
    case types.STATE:
    case types.PAGE:
      return setTrailingIfMissing(item.slug)
    case types.BLOG_POST:
      return `/blog${setTrailingIfMissing(item.slug)}`
  }
}

/**
 * Partition the hits in two separate arrays depending on relevance.
 *
 * This partitions each list of hits in two lists based on fullMatch condition:
 * - items with fullMatch on title/name are returned first
 * - items with fullMatch on body/author/any other are returned next.
 *
 * @param {*} results
 *  Search results returned by Algolia, indexed by index type.
 * @return {bestHits: [*], otherHits: [*]}
 */

export function partitionHitsByRelevance(results) {
  const bestHits = []
  const otherHits = []

  if (!results) {
    return { bestHits, otherHits }
  }

  const partitionHit = (hit, type, test) =>
    test ? bestHits.push({ ...hit, type }) : otherHits.push({ ...hit, type })

  const allHits = {
    [types.STATE]: results[types.STATE],
    [types.BLOG_POST]: results[types.BLOG_POST],
    [types.PAGE]: results[types.PAGE],
  }

  each(allHits, ({ hits: typeHits }, type) => {
    if (!typeHits) {
      return true
    }
    let titleField = ''
    if ([types.BLOG_POST, types.PAGE].includes(type)) {
      titleField = 'title'
    } else if (types.STATE === type) {
      titleField = 'name'
    }
    /* eslint-disable no-underscore-dangle */
    typeHits.forEach(hit =>
      partitionHit(
        hit,
        type,
        hit._highlightResult[titleField].matchLevel === 'full',
      ),
    )
    return true
    /* eslint-enable no-underscore-dangle */
  })
  return { bestHits, otherHits }
}

export default {}
