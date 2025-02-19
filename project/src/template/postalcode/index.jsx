import React, { useMemo, useState } from 'react'
import { Form } from 'react-bootstrap'
import { PinMap, Table } from 'react-bootstrap-icons';
import search from './../../assets/img/search.png'
import './search.css'
import { fetchMethod } from './helper'
import PostTable from './Table.jsx'
import Map from './../map/'
import Notes from './Notes'
import AlertMsg from  './AlertMsg'

const fetchInfo = async (searchVal = '') => {
  let url = ''
  if(isNaN(searchVal)) {
    url = `http://localhost:8080/postOffice/${searchVal}`
  } else {
    url = `http://localhost:8080/pincode/${searchVal}`
  }
  return await fetchMethod(url)
}

const SearchPanel = () => {
  const [isMapEnable, setIsMapEnable] = useState(false)
  const [isSearchEnable, setIsSearchEnable] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [preSearchVal, setPreSearchVal] = useState('')
  const [response, setResponse] = useState()
  const [pinDropdown, setPinDropdown] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [zipToMap, setZipToMap] = useState('')

  const clickHandler = (val) => {
    setIsMapEnable(val === 'map' ? true : false)
    setIsSearchEnable(val !== 'map' ? true : false)
  }
  
  const mapHandler = async (e) => {
    console.log(e.target.value, '=========')
    const url = `http://localhost:8080/latLang/${e.target.value.split('-')[0]}`
    const latLngList = await fetchMethod(url)
    const selPinCode = { ...latLngList, selectedPin: e.target.value }
    setZipToMap(selPinCode)

    console.log(selPinCode, '=latLngList')
    return 
  }

  const searchHandler = async (e) => {
    e.preventDefault()
    if(searchVal && preSearchVal !== searchVal) {
      setIsLoading(true)
      setIsError(false)
      fetchInfo(searchVal.trim()).then(res => {
        setIsSearchEnable(res.Status === 'Success' ? true : false)
        setIsError(res.Status !== 'Success' ? true : false)
        setResponse(res)
        setIsLoading(false)
        // set pinlist for dropdwon
        const pinList = res.PostOffice.map(ele => {
          return { pincode: ele.Pincode, city: ele.Name }
        })
        setPinDropdown(pinList)
      }).catch(err => {
        let error = {Status: 'Error', Message: `${err.name}: ${err.message}`}
        setResponse(error)
        setIsError(false)
        setIsLoading(false)
      })
      setPreSearchVal(searchVal)
    }
  }

  return (
    <div className='search-panel'>
      <Form method="/" className="">
        <input
          type="text"
          id="search-input"
          className="search-input"
          htmlFor="search-input"
          value={ searchVal }
          onChange={ (e) => setSearchVal(e.target.value) }
          placeholder="Enter postal address / pincode"
        />
        <button type="submit" className="search-button" onClick={ (e)=> searchHandler(e)} >
          <img src={search} alt="" />
        </button>
      </Form>
      
      { isLoading && <p className="mt-3 alert alert-primary"> Loading.........! </p>}
      <div className='search-result-container'>

        { !isLoading && response && (
          <div className=''>
            <AlertMsg msgType={ response?.Status } msg={ response?.Message } />
            { 
              response?.Status !== 'Error' && (
                <div className='display-flex'>
                  <div className="lftMenu">
                    <Table color="#000" size={40} className="m-2 cursor post-result" onClick={(e)=> clickHandler('post-result')} />
                    <PinMap color="#000" size={40} className="m-2 pin-map cursor map" onClick={(e)=> clickHandler('map') } />
                  </div>
                  { !isError && isMapEnable && (
                    <div className='rightMenu'>
                      <select defaultValue="---Select Pincode ---!" className='form-select form-select-lg' onChange={e => mapHandler(e)}>
                        <option disabled>---Select Pincode ---!</option>
                        {
                          pinDropdown.map((ele, indx) => {
                              return <option key={indx} value={`${ele.pincode}-${ele.city}`}> { `${ele.pincode} - ${ele.city}` } </option>
                            }
                          )
                        }
                      </select>
                    </div>
                  )}
                </div>
              )
            }
            {
               !isError && isMapEnable && (
                <div className='map-container' id="map-container" >
                  <Map location={zipToMap}/>
                </div>
              )
            }
            {/* Search result */
              !isError && isSearchEnable && (
              <div className='searched-result rounded mt-3' htmlFor={'Searched result'}>
                { 
                  <div className='table border border-secondary '>
                    <PostTable className="" tableType={'striped'} rowData={ response.PostOffice } />
                  </div>
                }
              </div>
              )
            }
          </div>
        )}
        {
          !isLoading && !response && (<Notes />)
        }
      </div>
    </div>
  )
}

export default SearchPanel;
