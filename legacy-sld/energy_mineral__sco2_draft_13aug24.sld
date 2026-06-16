<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>energy_mineral:sco2_draft_13aug24</sld:Name>
        <sld:UserStyle>
            <sld:Name>energy_minerals_storage_resource_estimate_style</sld:Name>
            <sld:Title>Storage Cost and Capacity Style with Border</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Green (6.387 - 11.795)</sld:Name>
                    <sld:Title>Storage Cost (6.3 - 11.8 $/tCO₂)</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>storage_cost_doll_per_tco2</ogc:PropertyName>
                                <ogc:Literal>6.386</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>storage_cost_doll_per_tco2</ogc:PropertyName>
                                <ogc:Literal>11.795</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#00FF00</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>
                                <ogc:Function name="Interpolate">
                                    <ogc:PropertyName>capacity_mtco2</ogc:PropertyName>
                                    <ogc:Literal>4.719877</ogc:Literal>
                                    <ogc:Literal>10</ogc:Literal>
                                    <ogc:Literal>5764.043791</ogc:Literal>
                                    <ogc:Literal>60</ogc:Literal>
                                </ogc:Function>
                            </sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Yellow (11.795 - 21.640)</sld:Name>
                    <sld:Title>Storage Cost (11.80 - 21.64 $/tCO₂)</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>storage_cost_doll_per_tco2</ogc:PropertyName>
                                <ogc:Literal>11.795</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>storage_cost_doll_per_tco2</ogc:PropertyName>
                                <ogc:Literal>21.640</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#FFFF00</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>
                                <ogc:Function name="Interpolate">
                                    <ogc:PropertyName>capacity_mtco2</ogc:PropertyName>
                                    <ogc:Literal>4.719877</ogc:Literal>
                                    <ogc:Literal>10</ogc:Literal>
                                    <ogc:Literal>5764.043791</ogc:Literal>
                                    <ogc:Literal>60</ogc:Literal>
                                </ogc:Function>
                            </sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Orange (21.640 - 35.451)</sld:Name>
                    <sld:Title>Storage Cost (21.64 - 35.45 $/tCO₂)</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>storage_cost_doll_per_tco2</ogc:PropertyName>
                                <ogc:Literal>21.640</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>storage_cost_doll_per_tco2</ogc:PropertyName>
                                <ogc:Literal>35.451</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#FFA500</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>
                                <ogc:Function name="Interpolate">
                                    <ogc:PropertyName>capacity_mtco2</ogc:PropertyName>
                                    <ogc:Literal>4.719877</ogc:Literal>
                                    <ogc:Literal>10</ogc:Literal>
                                    <ogc:Literal>5764.043791</ogc:Literal>
                                    <ogc:Literal>60</ogc:Literal>
                                </ogc:Function>
                            </sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Red (35.451 - 52.522)</sld:Name>
                    <sld:Title>Storage Cost (35.45 - 52.52 $/tCO₂)</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>storage_cost_doll_per_tco2</ogc:PropertyName>
                                <ogc:Literal>35.451</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>storage_cost_doll_per_tco2</ogc:PropertyName>
                                <ogc:Literal>52.522</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#FF0000</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>
                                <ogc:Function name="Interpolate">
                                    <ogc:PropertyName>capacity_mtco2</ogc:PropertyName>
                                    <ogc:Literal>4.719877</ogc:Literal>
                                    <ogc:Literal>10</ogc:Literal>
                                    <ogc:Literal>5764.043791</ogc:Literal>
                                    <ogc:Literal>60</ogc:Literal>
                                </ogc:Function>
                            </sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Dark Red (52.522 - 101.236)</sld:Name>
                    <sld:Title>Storage Cost (52.52 - 101.24 $/tCO₂)</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>storage_cost_doll_per_tco2</ogc:PropertyName>
                                <ogc:Literal>52.522</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>storage_cost_doll_per_tco2</ogc:PropertyName>
                                <ogc:Literal>101.236</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#8B0000</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>
                                <ogc:Function name="Interpolate">
                                    <ogc:PropertyName>capacity_mtco2</ogc:PropertyName>
                                    <ogc:Literal>4.719877</ogc:Literal>
                                    <ogc:Literal>10</ogc:Literal>
                                    <ogc:Literal>5764.043791</ogc:Literal>
                                    <ogc:Literal>60</ogc:Literal>
                                </ogc:Function>
                            </sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Green - Capacity Small (10 pt)</sld:Name>
                    <sld:Title>Minimum Storage Resource Estimate (~4.72 Mt CO₂)</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>storage_cost_doll_per_tco2</ogc:PropertyName>
                                <ogc:Literal>6.387</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>storage_cost_doll_per_tco2</ogc:PropertyName>
                                <ogc:Literal>11.795</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:MaxScaleDenominator>1.0</sld:MaxScaleDenominator>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#000000</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>5</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Green - Capacity Large (60 pt)</sld:Name>
                    <sld:Title>Maximum Storage Resource Estimate (~5,764 Mt CO₂)</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>storage_cost_doll_per_tco2</ogc:PropertyName>
                                <ogc:Literal>6.387</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>storage_cost_doll_per_tco2</ogc:PropertyName>
                                <ogc:Literal>11.795</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:MaxScaleDenominator>1.0</sld:MaxScaleDenominator>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#000000</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>15</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

