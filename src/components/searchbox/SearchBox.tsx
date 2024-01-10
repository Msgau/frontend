// Each comment refers to the section of this article 
// which explains the code block that follows.

import {useMemo, useState} from 'react';
import {useCombobox} from 'downshift';
import { SearchErrorMessage } from '../SearchErrorMessage/SearchErrorMessage';

// Section 7.3: to highlight the search term in search suggestions
function boldUserText({ length, offset, string }) {
  if (length === 0 && offset === 0) {
    return string;
  }
  const userText = string.substring(offset, offset + length);
  const stringBefore = string.substring(0, offset);
  const stringAfter = string.substring(offset + length);
  return `${stringBefore}<b>${userText}</b>${stringAfter}`;
}

export const SearchBox = () => {
  // Section 5.1: to update UI as search suggestion list or Google Maps server status changes
  const [searchResult, setSearchResult] = useState({
    autocompleteSuggestions: [],
    status: '',
  });
  // Section 2.2: to make an API call to Google Maps server
  const google = window.google;
  const service = new google.maps.places.AutocompleteService();
  // Section 3: to save money for using Google Maps autocomplete search
  const sessionToken = useMemo(
    () => new google.maps.places.AutocompleteSessionToken(),
    [google.maps.places.AutocompleteSessionToken],
  );
  // Section 5.4: to make autocomplete search accessible
  const {
    getInputProps,
    getItemProps,
    getMenuProps,
  } = useCombobox({
    items: searchResult.autocompleteSuggestions,
    onInputValueChange: ({inputValue}) => {
      // Section 6.1: remove search suggestions when the search term is deleted in search box
      if (inputValue === '') {
        setSearchResult({
          autocompleteSuggestions: [],
          status: '',                 
        });
        return;
      }
      // Section 4.1: make an API call to Google Maps server
      service.getPlacePredictions({
        input: inputValue,         
        sessionToken: sessionToken,
        }, handlePredictions       
      );   
      // Section 4.2: process the response from Google Maps server
      function handlePredictions(predictions, status) {
        if (status === "OK") {
          const autocompleteSuggestions = predictions.map((prediction) => {
            return {
              id: prediction.place_id,
              name: {
                string: prediction.structured_formatting.main_text,
                // Section 7.3: to highlight the search term in suggested place names
                length: prediction.structured_formatting.main_text_matched_substrings[0]['length'],
                offset: prediction.structured_formatting.main_text_matched_substrings[0]['offset'],
              },
              address: {
                string: prediction.structured_formatting.secondary_text,
                // Section 7.3: to highlight the search term in suggested place address
                length: prediction.structured_formatting.secondary_text_matched_substrings[0]['length'],
                offset: prediction.structured_formatting.secondary_text_matched_substrings[0]['offset'],
              },
            };
          });
          // Section 5.2: update UI with new search suggestions
          setSearchResult({
            autocompleteSuggestions: autocompleteSuggestions,
            status: 'OK',
          })
        } else {
          // Section 5.2: update UI with an error message
          setSearchResult({
            autocompleteSuggestions: [],
            status: status,             
          });
        }
      }
    }
  })

  
  // Section 5.4: render UI in an accessible way
  return (
    <div>
      <input 
        type="search"
        {...getInputProps()}
      />
      <ul
        {...getMenuProps()}
      >
        { // Section 5.3: show search suggestions
          searchResult.autocompleteSuggestions.length > 0
          ? searchResult.autocompleteSuggestions.map((item, index) => {
              return (
                <li
                  key={item.id}
                  {...getItemProps({
                    item,
                    index
                  })}
                >
                  {/* Section 7.3: highlight the search term in search suggestions */}
                  <p dangerouslySetInnerHTML={{__html: boldUserText(item.name)}}></p>
                  <p dangerouslySetInnerHTML={{__html: boldUserText(item.address)}}></p>
                </li>
              );
            })
          : null
        }
      </ul>
      {/* Section 6.2: show error messages */} 
      <SearchErrorMessage status={searchResult.status} />
    </div>
  )
};