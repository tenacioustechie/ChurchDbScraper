# ToDo

[x] Create Project setup
[x] Add Model classes for ACNC APIs
[x] Create API call for ACNC Classifications
[ ] Save ACNC Classifications to mongo view
[ ] Create Service that can call ACNC APIs
[ ] Save ACNC data to Mongo DB
[ ] Create output CSV at end of process for sharing with basic useful data

# Scraping Process Plan

- Call ACNC Search API by 'Church'
  - Check if record exist in DB
  - Check if record has changed since last scrape
  - Save summary record or new version to DB AcncCharitySummary View
- Call Get ACNC Classifications
  - Check if Classification exists
  - Save or update ACNC Classifications to DB AcncClassification View
- Call ACNC Search by Classification for each search classification
- Save all summary records to DB AcncCharitySummary View
- Query each Acnc Summary Record

# Mongo Tables

AcncClassification -> Add 'collect' boolean default false
AcncCharity -> new record with Id, AcncUUID, Name, shouldCollect (true|false)
AcncCharitySummary -> append version? with version number and date scraped
AcncCharityRecord -> append version? with version number and date scraped
AcncExcludeUUID -> for excluding entities

# Questions

- How to tell if something has changed?
  - Add last changed to record?
  - Add versioned record from ACNC data, add 'AcncChurch' record to point to each version
  - Only save new version if its actually changed
  - Version includes version number and date scraped
