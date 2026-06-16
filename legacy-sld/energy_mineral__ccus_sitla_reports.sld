<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>energy_mineral:ccus_sitla_reports</sld:Name>
        <sld:UserStyle>
            <sld:Name>energy_minerals_sitla_reports_style</sld:Name>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Limited Potential</sld:Name>
                    <sld:Title>Limited Potential</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>ranking</ogc:PropertyName>
                            <ogc:Literal>2.3 Limited Potential</ogc:Literal>
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
                    <sld:Name>Some Potential</sld:Name>
                    <sld:Title>Some Potential</sld:Title>
                    <ogc:Filter>
                        <ogc:Or>
                            <ogc:Or>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>ranking</ogc:PropertyName>
                                    <ogc:Literal>2.7 Some Potential</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>ranking</ogc:PropertyName>
                                    <ogc:Literal>3.0 Some Potential</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                            </ogc:Or>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>ranking</ogc:PropertyName>
                                <ogc:Literal>3.3 Some Potential</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:Or>
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
                    <sld:Name>Good Potential</sld:Name>
                    <sld:Title>Good Potential</sld:Title>
                    <ogc:Filter>
                        <ogc:Or>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>ranking</ogc:PropertyName>
                                <ogc:Literal>4.0 Good Potential</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>ranking</ogc:PropertyName>
                                <ogc:Literal>4.3 Good Potential</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:Or>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#cfff00</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Excellent Potential</sld:Name>
                    <sld:Title>Excellent Potential</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>ranking</ogc:PropertyName>
                            <ogc:Literal>5.0 Excellent Potential</ogc:Literal>
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
                    <sld:Name>Not Evaluated</sld:Name>
                    <sld:Title>Not Evaluated</sld:Title>
                    <sld:ElseFilter/>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#cdcdcd</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#232323</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

