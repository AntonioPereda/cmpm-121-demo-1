This is the starter code project for the `Demo 1` project in CMPM 121, Game Design Patterns, at UC Santa Cruz (fall quarter, 2024). Students should incrementally modify this project, tracking their progress wit git, to develop an incremental game of their own unique design.

####CHANGELOG####

- !!STEP 5 COMPLETE!!
- Added helpful comments in main.ts
- Renamed incrimentCount to globalUpdate
- Renamed the main button "button" to "theGameButton"
- Number of clicks now auto-update within globalUpdate

- Implimented AutoClick Upgrades
    - AutoClick rate changed from 1 to 0 / sec
    - Added AutoClick upgrade button that costs 10 clicks
        - AutoClick upgrade is disabled otherwise
        - AutoClick rate increases by 1 with each upgrade
