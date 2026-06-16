<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>hazards:quaternaryfaults_review</sld:Name>
        <sld:UserStyle>
            <sld:Name>hazards_qFaults_style</sld:Name>
            <sld:Title>Quaternary_Faults</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>_150_Years__Well_Constrained</sld:Name>
                    <sld:Title>&lt;150 Years, Well Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>faultage</ogc:PropertyName>
                                <ogc:Literal>&lt;150</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>mappingconstraint</ogc:PropertyName>
                                <ogc:Literal>well constrained</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#e60000</sld:CssParameter>
                            <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_15_000_Years_Well_Constrained</sld:Name>
                    <sld:Title>&lt;15,000 Years,Well Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>faultage</ogc:PropertyName>
                                <ogc:Literal>&lt;15,000</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>mappingconstraint</ogc:PropertyName>
                                <ogc:Literal>well constrained</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#e69800</sld:CssParameter>
                            <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_15_000_Years__Moderately_Constrained</sld:Name>
                    <sld:Title>&lt;15,000 Years, Moderately Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>faultage</ogc:PropertyName>
                                <ogc:Literal>&lt;15,000</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>mappingconstraint</ogc:PropertyName>
                                <ogc:Literal>moderately constrained</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#e69800</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">8.0 2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_15_000_Years__Inferred</sld:Name>
                    <sld:Title>&lt;15,000 Years, Inferred</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>faultage</ogc:PropertyName>
                                <ogc:Literal>&lt;15,000</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>mappingconstraint</ogc:PropertyName>
                                <ogc:Literal>inferred</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#e69800</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">3.0 3.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_130_000_Years__Well_Constrained</sld:Name>
                    <sld:Title>&lt;130,000 Years, Well Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>faultage</ogc:PropertyName>
                                <ogc:Literal>&lt;130,000</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>mappingconstraint</ogc:PropertyName>
                                <ogc:Literal>well constrained</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#4ce600</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_130_000_Years__Moderately_Constrained</sld:Name>
                    <sld:Title>&lt;130,000 Years, Moderately Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>faultage</ogc:PropertyName>
                                <ogc:Literal>&lt;130,000</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>mappingconstraint</ogc:PropertyName>
                                <ogc:Literal>moderately constrained</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#4ce600</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">8.0 2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_130_000_Years__Inferred</sld:Name>
                    <sld:Title>&lt;130,000 Years, Inferred</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>faultage</ogc:PropertyName>
                                <ogc:Literal>&lt;130,000</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>mappingconstraint</ogc:PropertyName>
                                <ogc:Literal>inferred</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#4ce600</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">3.0 3.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_750_000_Years__Well_Constrained</sld:Name>
                    <sld:Title>&lt;750,000 Years, Well Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>faultage</ogc:PropertyName>
                                <ogc:Literal>&lt;750,000</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>mappingconstraint</ogc:PropertyName>
                                <ogc:Literal>well constrained</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#005ce6</sld:CssParameter>
                            <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_750_000_Years__Moderately_Constrained</sld:Name>
                    <sld:Title>&lt;750,000 Years, Moderately Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>faultage</ogc:PropertyName>
                                <ogc:Literal>&lt;750,000</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>mappingconstraint</ogc:PropertyName>
                                <ogc:Literal>moderately constrained</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#005ce6</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">8.0 2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_750_000_Years__Inferred</sld:Name>
                    <sld:Title>&lt;750,000 Years, Inferred</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>faultage</ogc:PropertyName>
                                <ogc:Literal>&lt;750,000</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>mappingconstraint</ogc:PropertyName>
                                <ogc:Literal>inferred</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#005ce6</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">3.0 3.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_2_6_Million_Years__Well_Constrained</sld:Name>
                    <sld:Title>&lt;2.6 Million Years, Well Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>faultage</ogc:PropertyName>
                                <ogc:Literal>&lt;2,600,000</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>mappingconstraint</ogc:PropertyName>
                                <ogc:Literal>well constrained</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_2_6_Million_Years__Moderately_Constrained</sld:Name>
                    <sld:Title>&lt;2.6 Million Years, Moderately Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>faultage</ogc:PropertyName>
                                <ogc:Literal>&lt;2,600,000</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>mappingconstraint</ogc:PropertyName>
                                <ogc:Literal>moderately constrained</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">8.0 2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_2_6_Million_Years__Inferred</sld:Name>
                    <sld:Title>&lt;2.6 Million Years, Inferred</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>faultage</ogc:PropertyName>
                                <ogc:Literal>&lt;2,600,000</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>mappingconstraint</ogc:PropertyName>
                                <ogc:Literal>inferred</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">3.0 3.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Undetermined__Well_Constrained</sld:Name>
                    <sld:Title>Undetermined, Well Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>faultage</ogc:PropertyName>
                                <ogc:Literal>undetermined</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>mappingconstraint</ogc:PropertyName>
                                <ogc:Literal>well constrained</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#a900e6</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Undetermined__Moderately_Constrained</sld:Name>
                    <sld:Title>Undetermined, Moderately Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>faultage</ogc:PropertyName>
                                <ogc:Literal>undetermined</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>mappingconstraint</ogc:PropertyName>
                                <ogc:Literal>moderately constrained</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#a900e6</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">8.0 2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Undetermined__Inferred</sld:Name>
                    <sld:Title>Undetermined, Inferred</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>faultage</ogc:PropertyName>
                                <ogc:Literal>undetermined</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>mappingconstraint</ogc:PropertyName>
                                <ogc:Literal>inferred</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#a900e6</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">3.0 3.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

