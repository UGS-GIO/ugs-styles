<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>energy_mineral:geothermal_utgeothermaluses_current</sld:Name>
        <sld:UserStyle>
            <sld:Name>energy_minerals_geothermal_utgeothermaluses_style</sld:Name>
            <sld:Title>Utah Geothermal Uses</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Pool/Spa</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>use</ogc:PropertyName>
                            <ogc:Literal>Pool/Spa</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#ED5151</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#FFFFFF</sld:CssParameter>
                                    <sld:CssParameter name="stroke-opacity">0.5</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>10</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Greenhouses</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>use</ogc:PropertyName>
                            <ogc:Literal>Greenhouses</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#149ECE</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#999999</sld:CssParameter>
                                    <sld:CssParameter name="stroke-opacity">0.25</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>10</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Space Heating</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>use</ogc:PropertyName>
                            <ogc:Literal>Space Heating</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#A7C636</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#999999</sld:CssParameter>
                                    <sld:CssParameter name="stroke-opacity">0.25</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>10</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Power Plant</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>use</ogc:PropertyName>
                            <ogc:Literal>Power Plant</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#9E559C</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#999999</sld:CssParameter>
                                    <sld:CssParameter name="stroke-opacity">0.25</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>10</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Aquaculture</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>use</ogc:PropertyName>
                            <ogc:Literal>Aquaculture</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#FC921F</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#999999</sld:CssParameter>
                                    <sld:CssParameter name="stroke-opacity">0.25</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>10</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>SCUBA Diving</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>use</ogc:PropertyName>
                            <ogc:Literal>SCUBA Diving</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#FFDE3E</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#999999</sld:CssParameter>
                                    <sld:CssParameter name="stroke-opacity">0.25</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>10</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Geothermal Heating</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>use</ogc:PropertyName>
                            <ogc:Literal>Geothermal heating</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#FF7043</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#999999</sld:CssParameter>
                                    <sld:CssParameter name="stroke-opacity">0.25</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>10</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Other</sld:Name>
                    <sld:ElseFilter/>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#757575</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#999999</sld:CssParameter>
                                    <sld:CssParameter name="stroke-opacity">0.25</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>10</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

