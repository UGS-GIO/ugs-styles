<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>energy_mineral:basin_names</sld:Name>
        <sld:UserStyle>
            <sld:Name>energy_minerals_basins_style</sld:Name>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Excellent Potential</sld:Name>
                    <sld:Title>Excellent Potential</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>ranking</ogc:PropertyName>
                            <ogc:Literal>Excellent</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#3dc200</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Moderate Potential</sld:Name>
                    <sld:Title>Moderate Potential</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>ranking</ogc:PropertyName>
                            <ogc:Literal>Moderate</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#ffe700</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Limited Potential</sld:Name>
                    <sld:Title>Limited Potential</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>ranking</ogc:PropertyName>
                            <ogc:Literal>Limited</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#ff7e00</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Not Evaluated</sld:Name>
                    <sld:Title>Not Evaluated</sld:Title>
                    <sld:ElseFilter/>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:GraphicFill>
                                <sld:Graphic>
                                    <sld:Mark>
                                        <sld:WellKnownName>shape://slash</sld:WellKnownName>
                                        <sld:Stroke>
                                            <sld:CssParameter name="stroke-width">2</sld:CssParameter>
                                        </sld:Stroke>
                                    </sld:Mark>
                                    <sld:Size>8</sld:Size>
                                </sld:Graphic>
                            </sld:GraphicFill>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-linecap">square</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
        <sld:UserStyle>
            <sld:Name>energy_minerals_basins_style</sld:Name>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Excellent Potential</sld:Name>
                    <sld:Title>Excellent Potential</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>ranking</ogc:PropertyName>
                            <ogc:Literal>Excellent</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#3dc200</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Moderate Potential</sld:Name>
                    <sld:Title>Moderate Potential</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>ranking</ogc:PropertyName>
                            <ogc:Literal>Moderate</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#ffe700</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Limited Potential</sld:Name>
                    <sld:Title>Limited Potential</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>ranking</ogc:PropertyName>
                            <ogc:Literal>Limited</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#ff7e00</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Not Evaluated</sld:Name>
                    <sld:Title>Not Evaluated</sld:Title>
                    <sld:ElseFilter/>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:GraphicFill>
                                <sld:Graphic>
                                    <sld:Mark>
                                        <sld:WellKnownName>shape://slash</sld:WellKnownName>
                                        <sld:Stroke>
                                            <sld:CssParameter name="stroke-width">2</sld:CssParameter>
                                        </sld:Stroke>
                                    </sld:Mark>
                                    <sld:Size>8</sld:Size>
                                </sld:Graphic>
                            </sld:GraphicFill>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-linecap">square</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

