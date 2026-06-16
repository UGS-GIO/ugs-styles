<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>energy_mineral:pipelines</sld:Name>
        <sld:UserStyle>
            <sld:Name>energy_minerals_pipelines_style</sld:Name>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>CO2</sld:Name>
                    <sld:Title>CO2</sld:Title>
                    <ogc:Filter>
                        <ogc:Or>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>commodity</ogc:PropertyName>
                                <ogc:Literal>Carbon Dioxide</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>commodity</ogc:PropertyName>
                                <ogc:Literal>Carbon Dioxide (CO2)</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:Or>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">4</sld:CssParameter>
                        </sld:Stroke>
                    </sld:LineSymbolizer>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#7d079a</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">3</sld:CssParameter>
                        </sld:Stroke>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Crude Oil</sld:Name>
                    <sld:Title>Crude Oil</sld:Title>
                    <ogc:Filter>
                        <ogc:Or>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>commodity</ogc:PropertyName>
                                <ogc:Literal>Crude Oil</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>commodity</ogc:PropertyName>
                                <ogc:Literal>Petroleum</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>commodity</ogc:PropertyName>
                                <ogc:Literal>Petroleum (20 mb/d)</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:Or>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">4</sld:CssParameter>
                        </sld:Stroke>
                    </sld:LineSymbolizer>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#33a02c</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">3</sld:CssParameter>
                        </sld:Stroke>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Natural Gas</sld:Name>
                    <sld:Title>Natural Gas</sld:Title>
                    <ogc:Filter>
                        <ogc:Or>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>commodity</ogc:PropertyName>
                                <ogc:Literal>Liquid Natural Gas</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>commodity</ogc:PropertyName>
                                <ogc:Literal>Liquified Petroleum Gases (LPG)</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>commodity</ogc:PropertyName>
                                <ogc:Literal>Natural Gas</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>commodity</ogc:PropertyName>
                                <ogc:Literal>Hydrogen Sulfide bearing Product</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>commodity</ogc:PropertyName>
                                <ogc:Literal>Gas Gathering</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:Or>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">4</sld:CssParameter>
                        </sld:Stroke>
                    </sld:LineSymbolizer>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#e31a1c</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">3</sld:CssParameter>
                        </sld:Stroke>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Petroleum Products</sld:Name>
                    <sld:Title>Petroleum Products</sld:Title>
                    <ogc:Filter>
                        <ogc:Or>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>commodity</ogc:PropertyName>
                                <ogc:Literal>Petroleum Product</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>commodity</ogc:PropertyName>
                                <ogc:Literal>Petroleum Products</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:Or>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">4</sld:CssParameter>
                        </sld:Stroke>
                    </sld:LineSymbolizer>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#6bff08</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">3</sld:CssParameter>
                        </sld:Stroke>
                    </sld:LineSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

