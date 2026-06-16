<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>energy_mineral:cores</sld:Name>
        <sld:UserStyle>
            <sld:Name>energy_minerals_cores_and_cuttings_style</sld:Name>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Butts</sld:Name>
                    <sld:Title>Butts</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>type</ogc:PropertyName>
                            <ogc:Literal>BUTTS</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#30123b</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>7</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Chips</sld:Name>
                    <sld:Title>Chips</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>type</ogc:PropertyName>
                            <ogc:Literal>CHIPS</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#455bcd</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>7</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Core</sld:Name>
                    <sld:Title>Core</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>type</ogc:PropertyName>
                            <ogc:Literal>CORE</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#3e9cfe</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>7</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Core Chips</sld:Name>
                    <sld:Title>Core Chips</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>type</ogc:PropertyName>
                            <ogc:Literal>CORE CHIPS</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#18d7cb</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>7</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Cuttings</sld:Name>
                    <sld:Title>Cuttings</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>type</ogc:PropertyName>
                            <ogc:Literal>CUTTINGS</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#48f882</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>7</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Outcrop Samples</sld:Name>
                    <sld:Title>Outcrop Samples</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>type</ogc:PropertyName>
                            <ogc:Literal>OUTCROP SAMPLES</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#a4fc3c</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>7</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Sample</sld:Name>
                    <sld:Title>Sample</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>type</ogc:PropertyName>
                            <ogc:Literal>SAMPLE</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#e2dc38</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>7</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Sidewall</sld:Name>
                    <sld:Title>Sidewall</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>type</ogc:PropertyName>
                            <ogc:Literal>SIDEWALL</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#fea331</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>7</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Skeletonized Core</sld:Name>
                    <sld:Title>Skeletonized Core</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>type</ogc:PropertyName>
                            <ogc:Literal>SKELETONIZED CORE</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#ef5911</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>7</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Slabs</sld:Name>
                    <sld:Title>Slabs</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>type</ogc:PropertyName>
                            <ogc:Literal>SLABS</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#c22403</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>7</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

